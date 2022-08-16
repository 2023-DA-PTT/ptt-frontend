import { Component, OnInit } from '@angular/core';
import {PlanDto, PlanResourceService} from "../../../services";

@Component({
  selector: 'app-test-plan-overview',
  templateUrl: './test-plan-overview.component.html',
  styleUrls: ['./test-plan-overview.component.scss']
})
export class TestPlanOverviewComponent implements OnInit {
  testPlans: PlanDto[] = [];

  constructor(private testPlanService: PlanResourceService) { }

  ngOnInit(): void {
    this.testPlanService.apiPlanGet().subscribe(testPlans => {
      this.testPlans = testPlans;
    });
  }

}
