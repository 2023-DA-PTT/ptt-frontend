import {Component, Input, OnInit} from '@angular/core';
import {
  InputArgumentDto,
  InputArgumentResourceService,
  OutputArgumentDto,
  OutputArgumentResourceService
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

  constructor(private outputParamService: OutputArgumentResourceService) { }

  ngOnInit(): void {
  }

  addNewOutputParam() {
    this.outputParameters.push({id:-1, stepId: this.stepId})
  }
}
