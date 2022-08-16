import { HttpStepDto } from './../../../../services/model/httpStepDto';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PlanDto, ScriptStepDto, StepDto} from "../../../../services";
import {ScriptStepComponent} from "./script-step/script-step.component";

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {
  testId: number = -1;
  stepId: number = -1;
  testPlan: PlanDto = {id:-1,startId:-1,name:"Example test plan", description: "Test plan description"}
  step: HttpStepDto | ScriptStepDto = {id:-1,name:"Example test plan", description: "Test plan description", method: "POST", url: "https://google.com", body: "asdf"}
  //step: HttpStepDto | ScriptStepDto = {id:-1,name:"Example test plan", script:"asdf"}

  constructor(private activeRoute: ActivatedRoute,
              private router: Router) {
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
  }

  isScriptStep(step: HttpStepDto | ScriptStepDto) {
    return 'script' in step;
  }
}
