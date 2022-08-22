import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NextStepWithParameterRelationDto, OutputArgumentDto, OutputArgumentResourceService, StepResourceService } from 'src/app/services';
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

  constructor(private stepResource: StepResourceService,
              private outputArgResource: OutputArgumentResourceService) { }

  ngOnInit(): void {
    this.stepResource.apiPlanPlanIdStepStepIdNextsGet(this.planId,this.stepId).subscribe(
      data => {this.nextSteps = data;console.log(JSON.stringify(this.nextSteps))});
    this.outputArgResource.apiPlanPlanIdStepStepIdOutputArgumentGet(this.planId, this.stepId).subscribe(
      data => {this.outputArgs=data;console.log(JSON.stringify(this.outputArgs))});
  }

  onSubmit(nextStepsForm: NgForm): void {
    console.log(JSON.stringify(this.nextSteps));
  }

  addNewNextStep() {

  }
}
