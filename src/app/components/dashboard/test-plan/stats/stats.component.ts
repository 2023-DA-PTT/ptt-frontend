import {Component, OnInit} from '@angular/core';

import {
  DataPointResourceService,
  HttpStepResourceService,
  PlanRunDto,
  PlanRunResourceService,
  StepDto
} from "../../../../services";
import {ActivatedRoute, Router} from "@angular/router";
import {ChartConfiguration, ChartOptions} from "chart.js";
import {ChartServiceService} from "../../../../services/chart-service.service";
import {ToastrService} from "ngx-toastr";
import { lastValueFrom } from 'rxjs';

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
  steps: StepDto[] = [];

  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: false
      }
    },
    scales: {
      y: {
        ticks: {
          callback: function(value, index, ticks) {
            return value + " ms";
          }
        }
      }
    }
  };
  largeView: boolean = false;
  loadedSteps: number = 0;

  isLoadingData(): boolean {
    return this.steps.length > this.loadedSteps;
  }

  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private dataPointService: DataPointResourceService,
              private stepService: HttpStepResourceService,
              private testRunService: PlanRunResourceService,
              private chartService: ChartServiceService,
              private toastr: ToastrService) {
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

      lastValueFrom(this.testRunService.getPlanRunById(this.runId)).then(testRun => {
        this.testDate = Math.floor(testRun.startTime! * 1000);
        this.fromDate = Math.floor(testRun.startTime! * 1000) - 60000; // one min before test start
        if (testRun.runOnce) {
          this.toDate = Math.floor(testRun.startTime! * 1000) + 60000 // one min after test start
        } else {
          this.toDate = Math.floor((testRun.startTime * 1000) + (testRun.duration / 1000) + 600000) // one min after test end
        }
      }).then(() => 
      lastValueFrom(this.stepService.getAllHttpStepsForPlan(this.testId)).then(steps => {
        this.steps = steps;
        this.loadedSteps = steps.length;
        this.updateGraphs();
      }));

      this.testRunService.getPlanRunsForPlan(this.testId).subscribe(runs => {
        this.testRuns = runs;
      });
    });

  }

  updateGraphs() {
    const locLinedata: ChartConfiguration<'line'>['data'][] = [];
    const labels: number[] = [];

    this.loadedSteps = 0;

    for (let labelTime = this.fromDate; labelTime < this.toDate; labelTime += this.interval) {
      labels.push(labelTime);
    }

    if (labels.length == 0) {
      this.toastr.error("Wrong start and end time!")
      return;
    }

    this.steps.forEach((step, idx) => {
      this.chartService.getChartDataForPlanAndStep(this.runId, step, labels, this.fromDate, this.toDate, this.interval).then(chartConfig => {
        locLinedata.push(chartConfig);
        this.loadedSteps++;
      });
    });
    this.lineChartData = locLinedata;
  }
}
