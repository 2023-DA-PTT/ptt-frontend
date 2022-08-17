import { Component, OnInit } from '@angular/core';
import {PlanDto, PlanResourceService} from "../../../services";
import {NgForm} from "@angular/forms";
import {Toast, ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-test-plan-overview',
  templateUrl: './test-plan-overview.component.html',
  styleUrls: ['./test-plan-overview.component.scss']
})
export class TestPlanOverviewComponent implements OnInit {
  testPlans: PlanDto[] = [];
  createNewPlanModal= false;
  actTestPlan: PlanDto = {name: "", description: ""};

  constructor(private testPlanService: PlanResourceService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.testPlanService.apiPlanGet().subscribe(testPlans => {
      this.testPlans = testPlans;
    });
  }

  onSubmit(form: NgForm) {
    if(!form.valid) {
      console.log("FORM INVALID!");
      return;
    }

    this.testPlanService.apiPlanUserIdPost(1, this.actTestPlan).subscribe({
      next: () => {
        this.toastr.success("Success!");
        this.testPlanService.apiPlanGet().subscribe(testPlans => {
          this.testPlans = testPlans;
        });
        this.createNewPlanModal = false;
      },
      error: () => {
        this.toastr.error("Could create Test Plan");
      }
    });
  }
}
