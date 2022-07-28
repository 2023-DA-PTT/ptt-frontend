import { Component, OnInit } from '@angular/core';
import { PlanDto, PlanResourceService } from 'src/app/services';

@Component({
  selector: 'app-test-plan-list',
  templateUrl: './test-plan-list.component.html',
  styleUrls: ['./test-plan-list.component.scss']
})
export class TestPlanListComponent implements OnInit {

  plans: Array<PlanDto> = [];

  constructor(private planService: PlanResourceService) { }

  ngOnInit(): void {
    this.planService.apiPlanGet().subscribe({
      next: d=> {
        this.plans = d;
      }
    })
  }

}
