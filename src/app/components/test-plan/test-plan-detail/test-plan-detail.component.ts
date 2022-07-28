import { Component, OnInit } from '@angular/core';
import { PlanResourceService } from 'src/app/services';
import { PlanDto } from 'src/app/services/model/models';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-test-plan-detail',
  templateUrl: './test-plan-detail.component.html',
  styleUrls: ['./test-plan-detail.component.scss']
})
export class TestPlanDetailComponent implements OnInit {

  plan: undefined | PlanDto;

  constructor(private planService: PlanResourceService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      var id: number = +params['id'];
      if (!id) {
        return;
      }

      this.planService.apiPlanIdGet(id).subscribe({
        next: d => {
          this.plan = d;
        }
      })
    });
  }
}
