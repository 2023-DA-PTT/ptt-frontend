import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { InputArgumentDto, InputArgumentResourceService, NextStepWithParameterRelationDto, OutputArgumentDto, OutputArgumentResourceService, StepDto, StepResourceService } from 'src/app/services';
import { NextStepDto } from 'src/app/services/model/nextStepDto';

@Component({
  selector: 'app-next-steps',
  templateUrl: './next-steps.component.html',
  styleUrls: ['./next-steps.component.scss']
})
export class NextStepsComponent implements OnInit {
  @Input()
  stepId: number = -1;
  @Input()
  planId: number = -1;

  nextSteps: NextStepWithParameterRelationDto[] = [];
  outputArgs: OutputArgumentDto[] = [];
  steps: StepDto[] = [];
  inputLookUp = new Map<StepDto, InputArgumentDto[]>(); 

  constructor(private stepResource: StepResourceService,
    private outputArgResource: OutputArgumentResourceService,
    private inputArgResource: InputArgumentResourceService,) { }

  ngOnInit(): void {
    this.stepResource.apiPlanPlanIdStepGet(this.planId).subscribe(
      data => {
        this.steps = data;
        this.steps.forEach((step)=> {
          this.inputArgResource.apiPlanPlanIdStepStepIdInputArgumentGet(this.planId, step.id!).subscribe(
            inputsData=>this.inputLookUp.set(step, inputsData)
          )
        })
      })
    this.stepResource.apiPlanPlanIdStepStepIdNextsGet(this.planId,this.stepId).subscribe(
      data => {this.nextSteps = data});
    this.outputArgResource.apiPlanPlanIdStepStepIdOutputArgumentGet(this.planId, this.stepId).subscribe(
      data => {this.outputArgs=data});
  }

  onSubmit(nextStepsForm: NgForm): void {
    console.log(JSON.stringify(this.nextSteps));
  }

  addNewNextStep() {
    this.nextSteps.push({repeatAmount:1,stepParameterRelations: []})
  }

  compareStepsFn(a:StepDto,b:StepDto) {
    return a && b && a.id==b.id;
  }

  onChange(newStep: StepDto, nextStep: NextStepWithParameterRelationDto) {
    nextStep.repeatAmount = 1;
    nextStep.stepParameterRelations = [];
    this.inputLookUp.get(newStep)?.forEach(inArg => {
      	nextStep.stepParameterRelations?.push({inputArg: inArg, outputArgId: this.outputArgs[0]?.id })
    })
  }
}
