import {Component, Input, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  InputArgumentDto,
  InputArgumentResourceService,
  OutputArgumentDto,
  OutputArgumentResourceService,
  OutputType
} from "../../../../../services";

@Component({
  selector: 'app-output-parameters',
  templateUrl: './output-parameters.component.html',
  styleUrls: ['./output-parameters.component.scss']
})
export class OutputParametersComponent implements OnInit {
  @Input()
  stepId: number = -1;
  @Input()
  planId: number = -1;
  outputParameters: OutputArgumentDto[] = [];
  outputTypes: string[] = []

  constructor(private outputParamService: OutputArgumentResourceService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.outputTypes = Object.values(OutputType);

    this.outputParamService.getAllOutputArgumentForStep(this.planId, this.stepId).subscribe(
      (data) => this.outputParameters = data );
  }

  addNewOutputParam() {
    console.log(this.outputParameters);
    this.outputParameters.push({stepId: this.stepId})
  }

  onSubmit(outputParamForm: NgForm) {
    if (!outputParamForm.valid) {
      console.log("UNVALID")
      return;
    }

    this.outputParameters.filter(p => p.name).filter(p => !p.id).forEach(p => {
      this.outputParamService.createOutputArgumentForStep(this.planId, this.stepId, p).subscribe(p => {
        this.toastr.success("Created Output Parameter " + p.name);
      })
    });

    this.outputParameters.filter(p => p.name).filter(p => p.id).forEach(p => {
      this.outputParamService.putOutputArgumentForStep(p.id!, this.planId, this.stepId, p).subscribe(p => {
        this.toastr.success("Updated Output Parameter " + p.name);
      })
    });
  }
}
