import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {
  HttpStepDto,
  HttpStepResourceService,
  ScriptStepDto,
  ScriptStepResourceService,
  StepDto,
  StepResourceService
} from "../../../services";
import {ScriptStepComponent} from "./step/script-step/script-step.component";
import {HttpStepComponent} from "./step/http-step/http-step.component";

@Component({
  selector: 'app-test-plan',
  templateUrl: './test-plan.component.html',
  styleUrls: ['./test-plan.component.scss']
})
export class TestPlanComponent implements OnInit {
  id: number = -1;
  httpSteps: HttpStepDto[] = [];
  scriptSteps: ScriptStepDto[] = [];
  steps: StepDto[] = [];

  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private httpStepsService: HttpStepResourceService,
              private scriptStepService: ScriptStepResourceService,
              private stepService: StepResourceService) {
  }

  ngOnInit(): void {
    if(!(this.activeRoute.snapshot.params['test-id']) || isNaN(parseInt(this.activeRoute.snapshot.params['test-id']!))) {
      this.router.navigate(['/']);
      return;
    }

    this.id = parseInt(this.activeRoute.snapshot.params['test-id']!);

    this.stepService.apiPlanPlanIdStepGet(this.id).subscribe(steps => this.steps=steps);

    this.httpStepsService.apiPlanPlanIdStepHttpGet(this.id).subscribe(steps => {
      this.httpSteps = steps;
    });

    this.scriptStepService.apiPlanPlanIdStepScriptGet(this.id).subscribe(steps => {
      this.scriptSteps = steps;
    })
  }

}
