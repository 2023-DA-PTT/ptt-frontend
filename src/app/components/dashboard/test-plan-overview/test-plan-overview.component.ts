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
  createNewPlanManualModal= false;
  createNewPlanFromJsonModal= false;
  testPlanJsonString = "";
  actTestPlan: PlanDto = {name: "", description: ""};

  constructor(private testPlanService: PlanResourceService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.testPlanService.apiPlanGet().subscribe(testPlans => {
      this.testPlans = testPlans;
    });
  }

  createFromJson() {
    let testPlanJsonObj = {};
    try {
      testPlanJsonObj = JSON.parse(this.testPlanJsonString); 
    } catch (error: any) {
      this.toastr.error(error.message,"Testplan")
      return;
    }
    this.testPlanService.apiPlanImportPost(testPlanJsonObj).subscribe(
      {
        next: d=> {
          this.toastr.success("Created Testplan from JSON", "Testplan");
          this.createNewPlanFromJsonModal = false;
          this.testPlanService.apiPlanGet().subscribe(testPlans => {
            this.testPlans = testPlans;
          });
        },
        error: e=> this.toastr.error("Could not create Testplan","Testplan")
      }
    )
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
