import {Component, OnInit} from '@angular/core';
import {
  DataPointAggregationResourceService,
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

  constructor(private planService: PlanResourceService,
              private stepService: StepResourceService,
              private planRunService: PlanRunResourceService,
              private dataPointAggrService: DataPointAggregationResourceService) { }

  ngOnInit(): void {
    this.planService.getAllPlans().subscribe(plans => {
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
