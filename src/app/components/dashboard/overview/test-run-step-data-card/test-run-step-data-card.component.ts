import {Component, Input, OnInit} from '@angular/core';
import {StepDto} from "../../../../services";
import {PlanStepData} from "../../../../models/plan-step-data";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-test-run-step-data-card',
  templateUrl: './test-run-step-data-card.component.html',
  styleUrls: ['./test-run-step-data-card.component.scss']
})
export class TestRunStepDataCardComponent implements OnInit {

  @Input()
  stepName: string = "";

  @Input()
  duration: number = 0;

  @Input()
  placeholder: string = "";
  @Input()
  textColor: {} = {};

  constructor() { }

  ngOnInit(): void {
  }

}
