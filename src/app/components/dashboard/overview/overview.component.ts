import {Component, OnInit} from '@angular/core';
import {
  DataPointAggregationResourceService, MetricsResourceService,
  PlanResourceService,
  PlanRunResourceService,
  StepResourceService
} from "../../../services";
import {PlanData} from "../../../models/plan-data";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  testPlanData: PlanData[] = [];
  amountTestRuns: number = 0;
  avgRunsPerTestPlan: number = 0;
  testPlans: number = 0;
  virtualisedUsers: number = 0;
  virtualisedUsersLastTestRun: number = 0;
  durationLastTestRun: number = 0;
  lastTestRunId: number = -1;

  constructor(private planService: PlanResourceService,
              private stepService: StepResourceService,
              private planRunService: PlanRunResourceService,
              private dataPointAggrService: DataPointAggregationResourceService,
              private metricsService: MetricsResourceService) { }

  ngOnInit(): void {
    this.metricsService.getTestRunsOfUser().subscribe(testRuns => {
      this.amountTestRuns = testRuns;
    });

    this.metricsService.getAmountVirtualUsers().subscribe(vus => {
      this.virtualisedUsers = vus;
    })

    this.metricsService.getAverageRunsPerTestPlan().subscribe(avgRuns => {
      this.avgRunsPerTestPlan = avgRuns;
    });
    this.metricsService.getAmountTestPlans().subscribe(testPlans => {
      this.testPlans = testPlans;
    });
    this.metricsService.getLastTestRunId().subscribe(lastTestRunId=> {
      if(!lastTestRunId) {
        return;
      }
      this.lastTestRunId = lastTestRunId;

      this.metricsService.getAmountVirtualUsersForTestRun(lastTestRunId).subscribe(vUs => {
        this.virtualisedUsersLastTestRun = vUs;
      });

      this.metricsService.getPlanRunDuration(lastTestRunId).subscribe(lastTestRunDuration => {
        this.durationLastTestRun = Math.round(lastTestRunDuration/1000);
      })
    })

    this.planService.getAllPlansForUser().subscribe(plans => {
      plans.forEach(plan => {
        const planData: PlanData = {plan: plan, steps: [], runs: []};
        this.testPlanData.push(planData);

        this.planRunService.getPlanRunsForPlan(plan.id!).subscribe(planRuns => {
          planData.runs = planRuns;
          planRuns.sort((a,b) => b.startTime!-a.startTime!);

          if(planRuns.length >= 1) {
            this.stepService.getAllStepsForPlan(plan.id!).subscribe(steps => {
              steps.forEach(step => {
                this.dataPointAggrService.getAvgDurationForPlanRun(planRuns[0].id!, step.id!).subscribe((res: number) => {
                  const actStep = {step: step, avgDuration: Math.round(res / 1_000_000), avgDifferenceToLastRun: 0};
                  planData.steps.push(actStep);

                  if(planRuns.length >= 2) {
                    this.dataPointAggrService.getAvgDifferenceBetweenPlanRuns(planRuns[0].id!, step.id!, planRuns[1].id).subscribe((res:number) => {
                      actStep.avgDifferenceToLastRun = Math.round(res / 1_000_000);
                    })
                  }
                })
              })
            });
          }

        })
      } )
    })
  }
}
