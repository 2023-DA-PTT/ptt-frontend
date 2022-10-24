import {Component, OnInit} from '@angular/core';
import {PlanData} from "../../../models/plan-data";
import {PlanResourceService, PlanRunResourceService, StepResourceService} from "../../../services";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  testPlansData: PlanData[]= [];

  constructor(private testPlanService: PlanResourceService,
              private stepService: StepResourceService,
              private runsService: PlanRunResourceService) { }

  ngOnInit(): void {
    this.testPlanService.getAllPlans().subscribe(testPlans => {
      testPlans.forEach(testPlan => {
        const testPlanData: PlanData = {plan: testPlan, runs: [], steps: []}
        this.testPlansData.push(testPlanData);

        this.stepService.getAllStepsForPlan(testPlan.id!).subscribe(steps => {
          steps.forEach(step => {
            testPlanData.steps.push({step: step, avgDuration: 0, avgDifferenceToLastRun: 0})
          })
        });

        this.runsService.getPlanRunsForPlan(testPlan.id!).subscribe(runs => {
          testPlanData.runs = runs;
        })
      })
    });
  }

  runTimeToUnixTime(startTime: number) {
    return Math.floor(startTime * 1000);
  }
}
