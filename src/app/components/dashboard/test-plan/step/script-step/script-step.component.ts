import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CodeModel} from "@ngstack/code-editor";
import {ScriptStepDto, ScriptStepResourceService} from "../../../../../services";
import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-script-step',
  templateUrl: './script-step.component.html',
  styleUrls: ['./script-step.component.scss']
})
export class ScriptStepComponent implements OnInit {
  @Input() step: ScriptStepDto = {};
  @Output() stepChange = new EventEmitter<ScriptStepDto>();
  @Input()
  planId: number = -1;

  editorModel: CodeModel = {
    language: 'javascript',
    value: '',
    uri: 'script.json'
  };
  options = {
    contextmenu: true,
    minimap: {
      enabled: true,
    },
  };

  constructor(private scriptStepService: ScriptStepResourceService,
              private toastr: ToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.editorModel.value = this.step.script!;
  }

  onSubmit(submitScriptStep: NgForm) {
    if (!submitScriptStep.valid) {
      console.debug("FORM UNVALID!")
      return;
    }

    this.step.script = this.editorModel.value;

    if (this.step.id == -1) {
      this.scriptStepService.createScriptStepForPlan(this.planId, this.step).subscribe({
        next: step => {
          this.toastr.success("Success!")
          this.step = step;
          this.stepChange.emit(step);
          this.router.navigate(["/dashboard/test-plan/"+this.planId+"/step/"+step.id]).then()
        },
        error: () => {
          this.toastr.error("Error!")
        }
      });
    } else {
      this.scriptStepService.updateScriptStepForPlan(this.planId, this.step.id!, this.step).subscribe({
        next: step => {
          this.step = step;
          this.stepChange.emit(step);
          this.toastr.success("Saved")
        },
        error: () => {
          this.toastr.error()
        }
      });
    }
  }
}
