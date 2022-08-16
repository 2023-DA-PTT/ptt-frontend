import {Component, Input, OnInit} from '@angular/core';
import {InputArgumentDto, InputArgumentResourceService, StepDto} from "../../../../../services";

@Component({
  selector: 'app-input-parameters',
  templateUrl: './input-parameters.component.html',
  styleUrls: ['./input-parameters.component.scss']
})
export class InputParametersComponent implements OnInit {
  @Input()
  stepId: number = -1;
  @Input()
  planId: number = -1;
  inputParameters: InputArgumentDto[] = [];

  constructor(private inputParamsService: InputArgumentResourceService) { }

  ngOnInit(): void {
    /*this.inputParamsService.apiPlanPlanIdStepStepIdInputArgumentGet(this.planId, this.stepId).subscribe(
      (args: InputArgumentDto[]) => {
      this.inputParameters = args;
    })*/
  }

  addNewInputParam() {
    this.inputParameters.push({id:-1,stepId:this.stepId })
  }
}
