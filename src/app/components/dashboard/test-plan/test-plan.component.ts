import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {
  HttpStepDto,
  HttpStepResourceService, PlanRunDto, PlanRunResourceService,
  ScriptStepDto,
  ScriptStepResourceService,
  StepDto,
  StepResourceService
} from "../../../services";
import {ScriptStepComponent} from "./step/script-step/script-step.component";
import {HttpStepComponent} from "./step/http-step/http-step.component";
import {formatDate} from "@angular/common";
import * as moment from "moment";


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
  createNewStepModal = false;
  testRuns: PlanRunDto[] = [];

  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private httpStepsService: HttpStepResourceService,
              private scriptStepService: ScriptStepResourceService,
              private stepService: StepResourceService,
              private testRunService: PlanRunResourceService) {
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
    });

    this.testRunService.apiPlanrunPlanPlanIdGet(this.id).subscribe(runs => {
      this.testRuns = runs;
    })
  }

  createNewStep(type: string) {
    if(type == 'http') {
      this.router.navigate(["/dashboard/test-plan/"+ this.id + "/step/http"]).then();
    }
    else if(type == 'script') {
      this.router.navigate(["/dashboard/test-plan/" + this.id + "/step/script"]).then();
    }
  }

  formatTestRunTime(testRun: PlanRunDto) {
    return formatDate(new Date(testRun.startTime!), 'MMM d y, h:mm:ss a', navigator.language);
  }

  formatTestRunDuration(testRun: PlanRunDto) {
    return moment.utc(testRun.duration! / Math.pow(10, 5)).format('H [h] m [min] s [s] SSS [millis]');
  }
}
