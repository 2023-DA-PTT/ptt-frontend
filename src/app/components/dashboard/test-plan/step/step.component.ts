import { HttpStepDto } from './../../../../services/model/httpStepDto';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {
  HttpStepResourceService,
  PlanDto, PlanResourceService,
  ScriptStepDto,
  ScriptStepResourceService,
  StepDto, StepResourceService
} from "../../../../services";

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {
  testId: number = -1;
  stepId: number = -1;
  testPlan: PlanDto = {id:-1,startId:-1,name:"Example test plan", description: "Test plan description"}
  step: HttpStepDto | ScriptStepDto = {id:-1,name:"Example test plan", script:"asdf"}
  stepType: string = "";

  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private httpStepService: HttpStepResourceService,
              private scriptStepService: ScriptStepResourceService,
              private testPlanService: PlanResourceService,
              private stepService: StepResourceService) {
  }

  ngOnInit(): void {
    console.log(this.activeRoute.snapshot.params)
    if(!(this.activeRoute.snapshot.params['test-id'])
      || !(this.activeRoute.snapshot.params['step-id'])
      || isNaN(parseInt(this.activeRoute.snapshot.params['test-id']!))
      || isNaN(parseInt(this.activeRoute.snapshot.params['step-id']!))) {
      this.router.navigate(['/']);
      return;
    }

    this.testId = parseInt(this.activeRoute.snapshot.params['test-id']!);
    this.stepId = parseInt(this.activeRoute.snapshot.params['step-id']!);

    this.testPlanService.apiPlanIdGet(this.testId).subscribe(testPlan => {
      this.testPlan = testPlan;
    });

    this.stepService.apiPlanPlanIdStepStepIdGet(this.testId, this.stepId).subscribe(step => {
      if(!step.type) {
        this.router.navigate(['/']);
        return;
      }

      this.stepType = step.type;

      if(step.type === 'http') {
        this.httpStepService.apiPlanPlanIdStepStepIdHttpGet(this.testId, this.stepId).subscribe(step => {
          this.step = step;
        })
      }
      else if(step.type === 'script') {
        this.scriptStepService.apiPlanPlanIdStepStepIdScriptGet(this.testId, this.stepId).subscribe(step => {
          this.step = step;
        })
      }
      else {
        console.error("UNKOWN TYPE " + step.type)
      }
    })
  }
}
