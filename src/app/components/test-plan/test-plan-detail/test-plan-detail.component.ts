import { Component, OnInit } from '@angular/core';
import { PlanResourceService, StepResourceService } from 'src/app/services';
import { PlanDto, StepDto } from 'src/app/services/model/models';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-test-plan-detail',
  templateUrl: './test-plan-detail.component.html',
  styleUrls: ['./test-plan-detail.component.scss']
})
export class TestPlanDetailComponent implements OnInit {

  plan: undefined | PlanDto;
  steps: StepDto[] = [];
  currentStep: StepDto | undefined = undefined;

  constructor(private planService: PlanResourceService,
    private stepService: StepResourceService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      var id: number = +params['id'];
      if (!id) {
        return;
      }

      this.planService.apiPlanIdGet(id).subscribe({
        next: plan => {
          this.plan = plan;
          this.stepService.apiPlanPlanIdStepGet(id).subscribe({ next: steps => this.steps = steps })
        }
      })
    });
  }

  modifyStep(step: StepDto): void {
    this.currentStep = step;
    console.log(this.currentStep)
  }

  addStep(): void {
    this.currentStep = {
      id: 0,
      name: '',
      description: '',
      method: '',
      url: '',
      body: ''
    };
  }

  saveStep(step: StepDto): void {
    if (step.id == 0) {
      this.steps.push(step);
    } else if (this.currentStep) {
      var idx = this.steps.indexOf(this.currentStep);
      if (idx >= 0) this.steps.splice(idx, 1, step);
    }
    this.currentStep = undefined;
  }
}