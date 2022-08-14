import { StepResourceService } from '../../../../../services/api/stepResource.service';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { InputArgumentDto, InputArgumentResourceService, OutputArgumentDto, OutputArgumentResourceService, StepDto } from 'src/app/services';

@Component({
  selector: 'app-step-detail',
  templateUrl: './step-detail.component.html',
  styleUrls: ['./step-detail.component.scss']
})
export class StepDetailComponent implements OnInit {

  @Input() isNewStep: boolean = true;
  @Input() step: StepDto = {};
  @Output() stepChange = new EventEmitter<StepDto>();
  @Input() planId!: number;
  @Input() open: boolean = false;
  @Output() openChange = new EventEmitter<boolean>();

  @Input() steps: StepDto[] = [];

  public inputs: InputArgumentDto[] = []
  public outputs: OutputArgumentDto[] = []

  constructor(
    private stepService: StepResourceService,
    private inputArgService: InputArgumentResourceService,
    private outputArgService: OutputArgumentResourceService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.inputArgService.apiPlanPlanIdStepStepIdInputArgumentGet(this.planId, this.step.id!).subscribe({
      next: inputs => {
        this.inputs = inputs;
      }, error: err => {
        this.toastr.error("Could not load inputs for Step!", "Error");
      }
    })
    this.outputArgService.apiPlanPlanIdStepStepIdOutputArgumentGet(this.planId, this.step.id!).subscribe({
      next: outputs => {
        this.outputs = outputs;
      }, error: () => {
        this.toastr.error("Could not load inputs for Step!", "Error");
      }
    })
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key == "Escape") {
      this.close();
    }
  }

  addInputArgument(): void {
    this.inputs.push({
      id:0,
      name: '',
      stepId: this.step.id
    })
  }

  removeInputArgument(inputArgDto: InputArgumentDto):void {
    var idx = this.inputs.indexOf(inputArgDto);
    if(idx >= 0) {
      this.inputs.splice(idx,1);
    }
  }

  addOutputArgument(): void {
    this.outputs.push({
      id:0,
      name: '',
      stepId: this.step.id,
      jsonLocation: ''
    })
  }

  removeOutputArgument(outputArgDto: OutputArgumentDto):void {
    var idx = this.outputs.indexOf(outputArgDto);
    if(idx >= 0) {
      this.outputs.splice(idx,1);
    }
  }

  close(): void {
    this.open = false;
    this.openChange.emit(this.open);
  }

  save(): void {
    if (this.isNewStep) {
      this.stepService.apiPlanPlanIdStepPost(this.planId, this.step).subscribe({
        next: s => {
          this.toastr.success("Created Step!", "Success")

          this.inputs.forEach(inputParam => {
            console.log(inputParam);

            this.inputArgService.apiPlanPlanIdStepStepIdInputArgumentPost(
              this.planId,
              s.id!,
              {id: -1, stepId: s.id!, name: inputParam.name}).subscribe({
              error: () => this.toastr.error("Could not save input argument " + inputParam.name, "Error")
            })
          });

          this.outputs.forEach(outputParam => {
            this.outputArgService.apiPlanPlanIdStepStepIdOutputArgumentPost(
              this.planId,
              s.id!,
              {id: -1, stepId: s.id!, name: outputParam.name}).subscribe({
              error: () => this.toastr.error("Could not save output argument " + outputParam.name, "Error")
            })
          });


          this.step = s;
          this.stepChange.emit(s);
          this.steps.push(s);
        },
        error: e => {
          this.toastr.error("Could not create Step!", "Error")
          console.log(e)
        }
      });

    } else if (this.step.id != -1) {
      /*var tmp = this.currentStep!;
      this.stepService.apiPlanPlanIdStepStepIdPost(this.plan!.id!, tmp.id!, step).subscribe({
        next: d => {
          var idx = this.steps.indexOf(tmp);
          if (idx >= 0) this.steps.splice(idx, 1, step);
          this.toastr.success("Updated Step!", "Success")
        },
        error: e => {
          this.toastr.error("Could not update Step!", "Error")
        }
      })*/
      throw new Error("Update Not implemented!");
    }

    console.log(this.step);

    this.close();
  }

}
