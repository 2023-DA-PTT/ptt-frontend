import {Component, Input, OnInit} from '@angular/core';
import {CodeModel} from "@ngstack/code-editor";
import {ScriptStepDto, ScriptStepResourceService} from "../../../../../services";
import {FormGroup, NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-script-step',
  templateUrl: './script-step.component.html',
  styleUrls: ['./script-step.component.scss']
})
export class ScriptStepComponent implements OnInit {
  @Input()
  step: ScriptStepDto = {};
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
              private toastr: ToastrService) {
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

    this.scriptStepService.apiPlanPlanIdStepStepIdScriptPut(this.planId, this.step.id!, this.step).subscribe({
      next: newStep => {
        this.toastr.success("Saved")
      },
      error: err => {
        this.toastr.error("Error! ")
      }
    });
  }
}
