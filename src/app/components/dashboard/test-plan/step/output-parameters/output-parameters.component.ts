import {Component, Input, OnInit} from '@angular/core';
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

  constructor(private outputParamService: OutputArgumentResourceService) { }

  ngOnInit(): void {
    this.outputTypes = Object.values(OutputType);
  }

  addNewOutputParam() {
    this.outputParameters.push({id:-1, stepId: this.stepId})
  }
}
