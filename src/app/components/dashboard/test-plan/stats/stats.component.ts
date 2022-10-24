import {Component, EventEmitter, OnInit} from '@angular/core';

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
import {lastValueFrom, Observable, of} from "rxjs";
import {data} from "autoprefixer";
import {ChartServiceService} from "../../../../services/chart-service.service";
import {ToastrService} from "ngx-toastr";

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
    });

  }

  updateGraphs() {
    const locLinedata: ChartConfiguration<'line'>['data'][] = [];
    const labels: number[] = [];



    for (let labelTime = this.fromDate; labelTime < this.toDate; labelTime += this.interval) {
      labels.push(labelTime);
    }

    if (labels.length == 0) {
      this.toastr.error("Wrong start and end time!")
      return;
    }

    this.stepService.getAllHttpStepsForPlan(this.testId).subscribe(steps => {
      steps.forEach((step, idx) => {
        this.chartService.getChartDataForPlanAndStep(this.runId, step, labels, this.fromDate, this.toDate, this.interval).then(chartConfig => {
          locLinedata.push(chartConfig);
        });
      });
      this.lineChartData = locLinedata;
    });
  }
}
