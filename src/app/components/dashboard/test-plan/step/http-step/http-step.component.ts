import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpStepDto, HttpStepResourceService, RequestContentType } from 'src/app/services';

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

  constructor(private httpStepService: HttpStepResourceService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.contentTypes = Object.values(RequestContentType);
  }

  onSubmit(submitScriptStep: NgForm) {
    if (!submitScriptStep.valid) {
      console.debug("FORM UNVALID!")
      return;
    }

    this.httpStepService.apiPlanPlanIdStepStepIdHttpPut(this.planId, this.step.id!, this.step).subscribe({
      next: newStep => {
        this.toastr.success("Saved")
      },
      error: err => {
        this.toastr.error("Error! ")
      }
    });
  }
}
