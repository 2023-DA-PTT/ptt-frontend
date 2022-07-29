import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { InputArgumentDto, InputArgumentResourceService, OutputArgumentDto, OutputArgumentResourceService, StepDto } from 'src/app/services';

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

  @Input()
  planId!: number;

  currentStep!: StepDto;
  public inputs: InputArgumentDto[] = []
  public outputs: OutputArgumentDto[] = []

  @Output() saveStep = new EventEmitter<StepDto>();
  @Output() cancelStep = new EventEmitter<void>();

  constructor(
    private inputService: InputArgumentResourceService,
    private outputService: OutputArgumentResourceService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.currentStep = {
      id: this.step.id,
      name: this.step.name,
      description: this.step.description,
      method: this.step.method,
      url: this.step.url,
      body: this.step.body
    };

    this.inputService.apiPlanPlanIdStepStepIdInputArgumentGet(this.planId, this.step.id!).subscribe({
      next: inputs => {
        this.inputs = inputs;
      }, error: err => {
        this.toastr.error("Could not load inputs for Step!", "Error");
      }
    })
    this.outputService.apiPlanPlanIdStepStepIdOutputArgumentGet(this.planId, this.step.id!).subscribe({
      next: outputs => {
        this.outputs = outputs;
      }, error: err => {
        this.toastr.error("Could not load inputs for Step!", "Error");
      }
    })
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key == "Escape") {
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
