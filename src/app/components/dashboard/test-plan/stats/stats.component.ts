import {Component, OnInit} from '@angular/core';

import {
  DataPointResourceService,
  HttpStepResourceService,
  PlanRunResourceService
} from "../../../../services";
import {ActivatedRoute, Router} from "@angular/router";
import {ChartConfiguration, ChartOptions} from "chart.js";
import {NgForm} from "@angular/forms";
import {DataPointResultDto} from "../../../../services/model/dataPointResultDto";
import {lab} from "d3";
import {id} from "@swimlane/ngx-graph/lib/utils/id";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  testId: number = -1;
  runId: number = -1;
  testDate: number = 0;

  public lineChartData: ChartConfiguration<'line'>['data'][] = [];

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: false
      }
    }
  };
  public lineChartLegend = true;
  fromDate: number = 0;
  toDate: number = 0;
  interval: number = 10000;

  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private dataPointService: DataPointResourceService,
              private stepService: HttpStepResourceService,
              private testRunService: PlanRunResourceService) {
  }

  ngOnInit(): void {
    if (!(this.activeRoute.snapshot.params['test-id'])
      || !(this.activeRoute.snapshot.params['run-id'])
      || isNaN(parseInt(this.activeRoute.snapshot.params['test-id']!))
      || isNaN(parseInt(this.activeRoute.snapshot.params['run-id']!))) {
      this.router.navigate(['/']);
      return;
    }

    this.testId = parseInt(this.activeRoute.snapshot.params['test-id']!);
    this.runId = parseInt(this.activeRoute.snapshot.params['run-id']!);

    this.testRunService.getPlanRunById(this.runId).subscribe(testRun => {
      this.testDate = Math.floor(testRun.startTime! * 1000);
      this.fromDate = Math.floor(testRun.startTime! * 1000) - 60000; // one min before test start
      if (testRun.runOnce) {
        this.toDate = Math.floor(testRun.startTime! * 1000) + 60000 // one min after test start
      } else {
        this.toDate = Math.floor((testRun.startTime * 1000) + (testRun.duration / 1000) + 600000) // one min after test end
      }
      this.updateGraphs();
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

    this.updateGraphs();
  }

  updateGraphs() {
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
        this.dataPointService.getDataPointsForStep(this.runId, step.id!, 'min', this.fromDate, this.interval, this.toDate).subscribe((dataPoints: DataPointResultDto[]) => {
          const data: number[] = [];
          let cnt = 0;

          dataPoints.forEach(dp => {
            while (labels[cnt] != dp.start) {
              data.push(0);
              cnt++;
            }

            data.push(dp.duration! / 1_000_000);
            cnt++;
          });

          while (labels.length > data.length) {
            data.push(0);
          }

          locLinedata.push({
            labels: labels.map(label => new Date(label).toLocaleTimeString()),
            datasets: [
              {
                data: data,
                label: step.name,
                fill: true,
                tension: 0.5,
                borderColor: 'gray',
                backgroundColor: 'rgba(67,144,248,0.3)',
                pointBorderWidth: 0.5
              }
            ],
          });
        })
      });
      this.lineChartData = locLinedata;
    });
  }
}
