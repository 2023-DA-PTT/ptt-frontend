import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpStepDto, HttpStepResourceService, RequestContentType } from 'src/app/services';

@Component({
  selector: 'app-http-step',
  templateUrl: './http-step.component.html',
  styleUrls: ['./http-step.component.scss']
})
export class HttpStepComponent implements OnInit {
  
  @Output() stepChange = new EventEmitter<HttpStepDto>();
  @Input()
  step: HttpStepDto = {};
  @Input()
  planId: number = -1;

  contentTypes: RequestContentType[] = [];

  constructor(private httpStepService: HttpStepResourceService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
    this.contentTypes = Object.values(RequestContentType);
  }

  onSubmit(submitScriptStep: NgForm) {
    if (!submitScriptStep.valid) {
      console.debug("FORM UNVALID!")
      return;
    }

    if (this.step.id == -1) {
      this.httpStepService.apiPlanPlanIdStepHttpPost(this.planId, this.step).subscribe({
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
      this.httpStepService.apiPlanPlanIdStepStepIdHttpPut(this.planId, this.step.id!, this.step).subscribe({
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
