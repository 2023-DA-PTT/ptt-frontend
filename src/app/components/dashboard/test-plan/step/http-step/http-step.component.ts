import { Component, Input, OnInit } from '@angular/core';
import { HttpStepDto, RequestContentType } from 'src/app/services';

@Component({
  selector: 'app-http-step',
  templateUrl: './http-step.component.html',
  styleUrls: ['./http-step.component.scss']
})
export class HttpStepComponent implements OnInit {
  
  @Input()
  step: HttpStepDto = {};
  @Input()
  planId: number = -1;

  contentTypes: RequestContentType[] = [];

  constructor() { }

  ngOnInit(): void {
    this.contentTypes = Object.values(RequestContentType);
  }

}
