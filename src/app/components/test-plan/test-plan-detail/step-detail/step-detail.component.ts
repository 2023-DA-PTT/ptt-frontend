import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { StepDto } from 'src/app/services';

@Component({
  selector: 'app-step-detail',
  templateUrl: './step-detail.component.html',
  styleUrls: ['./step-detail.component.scss']
})
export class StepDetailComponent implements OnInit {

  @Input()
  isNewStep: boolean = true;

  @Input()
  step!: StepDto;

  currentStep!: StepDto;

  @Output() saveStep = new EventEmitter<StepDto>();
  @Output() cancelStep = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
    this.currentStep = {
      id: this.step.id,
      name: this.step.name,
      description: this.step.description,
      method: this.step.method,
      url: this.step.url,
      body: this.step.body
    };
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key=="Escape") {
      this.cancel();
    }
  }


  cancel(): void {
    this.cancelStep.emit();
  }

  save(): void {
    this.saveStep.emit(this.currentStep);
  }

}
