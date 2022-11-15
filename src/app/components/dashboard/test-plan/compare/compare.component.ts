import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {ChartOptions} from "chart.js";
import {lastValueFrom} from "rxjs";
import {
  HttpStepDto,
  HttpStepResourceService,
  MetricsResourceService,
  PlanRunDto,
  PlanRunResourceService
} from "../../../../services";
import {ActivatedRoute, Router} from "@angular/router";
import {ChartServiceService} from "../../../../services/chart-service.service";
import {IntervalSelectMode} from "../../../../models/interval-select-mode";
import {ToastrService} from "ngx-toastr";
import {formatDate} from "@angular/common";
import {NamedChartData} from "../../../../models/named-chart-data";
import {PlanrunWithFirstDatapointTime} from "../../../../models/planrun-with-first-datapoint-time";
import {PlanRunWithTime} from "../../../../models/plan-run-with-time";

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss'],
  host: {
    class:'w-full'
  }
})
export class CompareComponent implements OnInit {
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
          callback: function (value, index, ticks) {
            return value + " ms";
          }
        }
      }
    }
  };
  compareTestChartData: NamedChartData[] = [];
  lineChartLegend = true;
  testRuns: PlanRunDto[] = [];
  testId: number = -1;
  firstPlanRunWithDPTime: PlanrunWithFirstDatapointTime = {planRun: {}, firstDatapointTime: 0};
  secondPlanRunWithDPTime: PlanrunWithFirstDatapointTime = {planRun: {}, firstDatapointTime: 0};
  from: number = 0;
  to: number = 1000;
  interval: number = 100;
  intervalSelectMode = IntervalSelectMode.TIME_AFTER_TEST_START;
  totalSteps: number = 0;
  loadedSteps: number = 0;
  largeView: boolean = false;
  httpSteps: HttpStepDto[] = [];
  firstTestRunId: number = -1;
  secondTestRunId: number = -1;

  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private stepService: HttpStepResourceService,
              private testRunService: PlanRunResourceService,
              private chartService: ChartServiceService,
              private toastr: ToastrService,
              private metricsService: MetricsResourceService,
              @Inject(LOCALE_ID) private locale: string) {
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      if (!(params['test-id'])
        || isNaN(parseInt(params['test-id']!))) {
        this.router.navigate(['/']);
        return;
      }

      this.testId = parseInt(params['test-id']!);

      this.testRunService.getPlanRunsForPlan(this.testId).subscribe(runs => {
        this.testRuns = runs;
      });

      this.stepService.getAllHttpStepsForPlan(this.testId).subscribe(steps => {
        this.httpSteps = steps;
      });
    });
  }

  isLoadingData(): boolean {
    return this.totalSteps > this.loadedSteps;
  }

  compareTestRun() {
    if (this.firstPlanRunWithDPTime.firstDatapointTime <= 0 || this.secondPlanRunWithDPTime.firstDatapointTime <= 0
      || this.httpSteps.length <= 0) {
      this.toastr.error("One of the test runs didn't start yet!")
      return;
    } else if (this.isLoadingData()) {
      this.toastr.error("Data is already loading . . .")
      return;
    }

    this.compareTestChartData.length = 0;
    this.loadedSteps = 0;
    this.totalSteps = this.httpSteps.length;

    let {
      offsetFirstPlanRun,
      offsetSecondPlanRun,
      fromLocal,
      labels
    } = this.calculateOffsets(this.firstPlanRunWithDPTime, this.secondPlanRunWithDPTime);

    const firstPlanRun = this.firstPlanRunWithDPTime.planRun;
    const secondPlanRun = this.secondPlanRunWithDPTime.planRun;

    if (labels.length == 0) {
      this.toastr.error("Invalid offsets!");
      return;
    }

    this.httpSteps.forEach(step => {
      this.chartService.getChartDataForPlanAndStep(firstPlanRun.id!,
        step,
        labels,
        fromLocal + this.from,
        fromLocal + this.to,
        this.interval,
        firstPlanRun.name ? firstPlanRun.name : formatDate(new Date(firstPlanRun.startTime! * 1000), "dd.MM.yyyy HH:mm:ss", this.locale),
        'rgba(0,42,255,0.3)',
        offsetFirstPlanRun,
        fromLocal+ this.from,
      ).then(firstChartConfig => {
        return this.chartService.getChartDataForPlanAndStep(secondPlanRun.id!,
          step,
          labels,
          fromLocal + this.from,
          fromLocal + this.to,
          this.interval,
          secondPlanRun.name ? secondPlanRun.name : formatDate(new Date(secondPlanRun.startTime! * 1000), "dd.MM.yyyy HH:mm:ss", this.locale),
          'rgba(255,0,0,0.3)',
          offsetSecondPlanRun,
          fromLocal + this.from,
        ).then(secondChartConfig => {
          console.log(firstChartConfig);
          console.log(secondChartConfig);
          this.compareTestChartData.push({
            name: step.name!,
            data: {
              labels: labels.map(label => label + 'ms'),
              datasets: firstChartConfig.datasets.concat(secondChartConfig.datasets)
            }
          });
          console.log("got chart " + step.id)
          this.loadedSteps++;
        });
      });
    });
  }

  private calculateOffsets(firstPlanRun: PlanrunWithFirstDatapointTime, secondPlanRun: PlanrunWithFirstDatapointTime) {
    let offsetFirstPlanRun: number | undefined = undefined;
    let offsetSecondPlanRun: number | undefined = undefined;
    let fromLocal: number;

    let firstPlanStartTime = firstPlanRun.firstDatapointTime;
    let secondPlanStartTime = secondPlanRun.firstDatapointTime;

    let labels: number[] = [];
    for (let labelTime = this.from; labelTime <= this.to; labelTime += this.interval) {
      labels.push(labelTime);
    }

    if (firstPlanStartTime > secondPlanStartTime) {
      fromLocal = firstPlanStartTime;
      offsetSecondPlanRun = (firstPlanStartTime - secondPlanStartTime) ;
    } else {
      fromLocal = secondPlanStartTime;
      offsetFirstPlanRun = (secondPlanStartTime - firstPlanStartTime);
    }

    return {offsetFirstPlanRun, offsetSecondPlanRun, fromLocal, labels};
  }

  selectSecondTestRun(id: any) {
    this.secondPlanRunWithDPTime.firstDatapointTime = -1;
    this.testRunService.getPlanRunById(id).subscribe(planRun => {
      this.secondPlanRunWithDPTime.planRun = planRun;
    });
    this.metricsService.getFirstDataPointOfPlanRun(id).subscribe(dpTime => {
      this.secondPlanRunWithDPTime.firstDatapointTime = dpTime;
    });
  }

  selectFirstTestRun(id: any) {
    this.secondPlanRunWithDPTime.firstDatapointTime = -1;
    this.testRunService.getPlanRunById(id).subscribe(planRun => {
      this.firstPlanRunWithDPTime.planRun = planRun;
    });
    this.metricsService.getFirstDataPointOfPlanRun(id).subscribe(dpTime => {
      this.firstPlanRunWithDPTime.firstDatapointTime = dpTime;
    });
  }
}
