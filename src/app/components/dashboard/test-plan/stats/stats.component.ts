import {Component, OnInit} from '@angular/core';

import {
  DataPointResourceService, HttpStepDto,
  HttpStepResourceService, PlanRunDto,
  PlanRunResourceService, StepDto
} from "../../../../services";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {ChartConfiguration, ChartOptions} from "chart.js";
import {NgForm} from "@angular/forms";
import {DataPointResultDto} from "../../../../models/dataPointResultDto";
import {lab} from "d3";
import {id} from "@swimlane/ngx-graph/lib/utils/id";
import {lastValueFrom, Observable} from "rxjs";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  testId: number = -1;
  runId: number = -1;
  testDate: number = 0;

  lineChartData: ChartConfiguration<'line'>['data'][] = [];
  lineChartLegend = true;
  fromDate: number = 0;
  toDate: number = 0;
  interval: number = 10000;
  testRuns: PlanRunDto[] = [];
  testRunCompareId: number = -1;
  compareTestChartData: ChartConfiguration<'line'>['data'][] = [];

  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: false
      }
    }
  };

  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private dataPointService: DataPointResourceService,
              private stepService: HttpStepResourceService,
              private testRunService: PlanRunResourceService) {
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      if (!(params['test-id'])
        || !(params['run-id'])
        || isNaN(parseInt(params['test-id']!))
        || isNaN(parseInt(params['run-id']!))) {
        this.router.navigate(['/']);
        return;
      }

      this.testId = parseInt(params['test-id']!);
      this.runId = parseInt(params['run-id']!);

      this.testRunService.getPlanRunById(this.runId).subscribe(testRun => {
        this.testDate = Math.floor(testRun.startTime! * 1000);
        this.fromDate = Math.floor(testRun.startTime! * 1000) - 60000; // one min before test start
        if (testRun.runOnce) {
          this.toDate = Math.floor(testRun.startTime! * 1000) + 60000 // one min after test start
        } else {
          this.toDate = Math.floor((testRun.startTime * 1000) + (testRun.duration / 1000) + 600000) // one min after test end
        }
        this.updateGraphs();
      });

      this.testRunService.getPlanRunsForPlan(this.testId).subscribe(runs => {
        this.testRuns = runs;
      });
    })

  }

  setFromDate(fromD: string) {
    const fromDate = new Date(fromD).getTime();

    if (fromDate) {
      this.fromDate = Math.floor(fromDate);
    }
  }

  setToDate(toD: string) {
    const toDate = new Date(toD).getTime();

    if (toDate) {
      this.toDate = Math.floor(toDate);
    }
  }

  onSubmit(filterForm: NgForm) {
    if (!filterForm.valid) {
      return;
    }

    this.updateGraphs(true);
  }

  updateGraphs(updateCompareGraph = false) {
    const locLinedata: ChartConfiguration<'line'>['data'][] = [];
    const labels: number[] = [];
    for (let labelTime = this.fromDate; labelTime < this.toDate; labelTime += this.interval) {
      labels.push(labelTime);
    }

    if (labels.length == 0) {
      return;
    }

    this.stepService.getAllHttpStepsForPlan(this.testId).subscribe(steps => {
      steps.forEach((step, idx) => {
        this.getChartDataForPlanAndStep(this.runId, step, labels).then(chartConfig => {
          locLinedata.push(chartConfig);
        });
      });
      this.lineChartData = locLinedata;
    });

    if(updateCompareGraph) {
      this.compareTestRun(this.testRunCompareId);
    }
  }

  compareTestRun(planRunId: number) {
    if(planRunId <= 0) {
      return;
    }
    this.compareTestChartData.length = 0;
    const labels: number[] = [];
    for (let labelTime = this.fromDate; labelTime < this.toDate; labelTime += this.interval) {
      labels.push(labelTime);
    }

    if (labels.length == 0) {
      return;
    }

    this.stepService.getAllHttpStepsForPlan(this.testId).subscribe(steps => {
      steps.forEach((step, idx) => {
        lastValueFrom(this.testRunService.getPlanRunById(this.runId))
          .then((planRun: PlanRunDto) => {
            return this.getChartDataForPlanAndStep(this.runId, step, labels, planRun.name).then(chartConfig => {
              return chartConfig;
            });
          })
          .then(data => {
            return lastValueFrom(this.testRunService.getPlanRunById(planRunId))
              .then((planRun: PlanRunDto) => {
                return this.getChartDataForPlanAndStep(planRunId, step, labels, planRun.name, 'rgba(255,0,0,0.3)').then(chartConfig => {
                  data.datasets.push(chartConfig.datasets[0]);
                  return data;
                });
              });
          })
          .then(data => {
            this.compareTestChartData.push(data);
          });
      });
    });
  }

  private getChartDataForPlanAndStep(planRunId: number, step: HttpStepDto, labels: number[], label?: string, backgroundcolor?: string): Promise<ChartConfiguration<'line'>['data']> {
    return this.getDataArrayForTestStep(planRunId, step, labels).then(data => {
      return {
        labels: labels.map(label => new Date(label).toLocaleTimeString()),
        datasets: [
          {
            data: data,
            label: label ? label : step.name,
            fill: true,
            tension: 0.5,
            borderColor: 'gray',
            backgroundColor: backgroundcolor ? backgroundcolor : 'rgba(67,144,248,0.3)',
            pointBorderWidth: 0.5
          }
        ],
      };
    });
  }

  getDataArrayForTestStep(planRunId: number,
                          step: StepDto,
                          labels: number[]): Promise<number[]> {
    console.log("getting data . . . " + planRunId);
    return lastValueFrom(this.dataPointService.getDataPointsForStep(planRunId, step.id!, 'max', this.fromDate, this.interval, this.toDate)).then((dataPoints: DataPointResultDto[]) => {
      const data: number[] = [];
      let cnt = 0;

      dataPoints.forEach(dp => {
        while (labels[cnt] <= dp.start!) {
          data.push(0);
          cnt++;
        }

        data.push(dp.duration! / 1_000_000);
        cnt++;
      });

      while (labels.length > data.length) {
        data.push(0);
      }

      return data;
    });
  }
}
