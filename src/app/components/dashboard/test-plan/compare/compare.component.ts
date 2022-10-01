import {Component, OnInit} from '@angular/core';
import {ChartConfiguration, ChartOptions} from "chart.js";
import {first, lastValueFrom} from "rxjs";
import {HttpStepResourceService, PlanRunDto, PlanRunResourceService, StepResourceService} from "../../../../services";
import {ActivatedRoute, Router} from "@angular/router";
import {ChartServiceService} from "../../../../services/chart-service.service";
import {lab} from "d3";
import {IntervalSelectMode} from "../../../../models/interval-select-mode";

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {
  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: false
      }
    }
  };
  compareTestChartData: ChartConfiguration<'line'>['data'][] = [];
  lineChartLegend = true;
  testRuns: PlanRunDto[] = [];
  testId: number = -1;
  firstTestRun: number = -1;
  secondTestRun: number = -1;
  from: number = 0;
  to: number = 1000;
  interval: number = 100;
  intervalSelectMode = IntervalSelectMode.TIME_AFTER_TEST_START;

  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private stepService: HttpStepResourceService,
              private testRunService: PlanRunResourceService,
              private chartService: ChartServiceService) {
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
    });
  }

  compareTestRun(firstPlanRun: number, secondPlanRun: number) {
    if (firstPlanRun <= 0 || secondPlanRun <= 0) {
      return;
    }

    this.compareTestChartData.length = 0;

    this.stepService.getAllHttpStepsForPlan(this.testId).subscribe(steps => {
      steps.forEach((step, idx) => {
        lastValueFrom(this.testRunService.getPlanRunById(firstPlanRun)).then((firstPlanRun: PlanRunDto) =>
          lastValueFrom(this.testRunService.getPlanRunById(secondPlanRun)).then((secondPlanRun: PlanRunDto) => {
            let offsetFirstPlanRun: number | undefined = undefined;
            let offsetSecondPlanRun: number | undefined = undefined;
            let fromLocal: number;

            if (firstPlanRun.startTime! > secondPlanRun.startTime!) {
              fromLocal = secondPlanRun.startTime!;
              offsetSecondPlanRun = (firstPlanRun.startTime! - secondPlanRun.startTime!)*1000;
            } else {
              fromLocal = secondPlanRun.startTime!;
              offsetFirstPlanRun = (secondPlanRun.startTime! - firstPlanRun.startTime!)*1000;
            }

            let labels: number[] = [];
            for (let labelTime = this.from; labelTime < this.to; labelTime += this.interval) {
              labels.push(labelTime);
            }

            if (labels.length == 0) {
              const ret:ChartConfiguration<'line'>['data'] = {
                labels: labels.map(label => label + 'ms'),
                datasets: []
              };

              return ret;
            }

            return this.chartService.getChartDataForPlanAndStep(firstPlanRun.id!,
              step,
              labels,
              (fromLocal + this.from)*1000,
              (fromLocal + this.to)*1000,
              this.interval,
              firstPlanRun.name,
              'rgba(0,42,255,0.3)',
              offsetFirstPlanRun,
              (fromLocal + this.from)*1000,
            ).then(firstChartConfig => {
              return this.chartService.getChartDataForPlanAndStep(secondPlanRun.id!,
                step,
                labels,
                (fromLocal + this.from) *1000,
                (fromLocal + this.to) * 1000,
                this.interval,
                secondPlanRun.name,
                'rgba(255,0,0,0.3)',
                offsetSecondPlanRun,
                (fromLocal + this.from) *1000,
              ).then(secondChartConfig => {
                const ret:ChartConfiguration<'line'>['data'] = {
                  labels: labels.map(label => label + 'ms'),
                  datasets: firstChartConfig.datasets.concat(secondChartConfig.datasets)
                };
                return ret;
              });
            });
          })
            .then(data => {
              this.compareTestChartData.push(data);
            }));
      });
    });
  }

}
