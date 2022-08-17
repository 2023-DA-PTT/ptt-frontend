import {Component, Input, OnInit} from '@angular/core';
import {InputArgumentDto, InputArgumentResourceService, StepDto} from "../../../../../services";
import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

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

  constructor(private inputParamsService: InputArgumentResourceService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.inputParamsService.apiPlanPlanIdStepStepIdInputArgumentGet(this.planId, this.stepId).subscribe(
        (data) => this.inputParameters = data );
  }

  addNewInputParam() {
    this.inputParameters.push({stepId: this.stepId})
  }

  onSubmit(inputParamForm: NgForm) {
    if (!inputParamForm.valid) {
      console.log("UNVALID")
      return;
    }

    this.inputParameters.filter(p => p.name).filter(p => !p.id).forEach(p => {
      this.inputParamsService.apiPlanPlanIdStepStepIdInputArgumentPost(this.planId, this.stepId, p).subscribe(p => {
        this.toastr.success("Created Input Parameter " + p.name);
      })
    });

    this.inputParameters.filter(p => p.name).filter(p => p.id).forEach(p => {
      this.inputParamsService.apiPlanPlanIdStepStepIdInputArgumentInArgIdPut(p.id!, this.planId, this.stepId, p).subscribe(p => {
        this.toastr.success("Updated Input Parameter " + p.name);
      })
    });
  }
}
