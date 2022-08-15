import { Component, OnInit } from '@angular/core';
import { AdvancedPlanRunDto } from 'src/app/models/plan-run';
import { PlanResourceService, PlanRunResourceService } from 'src/app/services';
import { PlanRunDto } from 'src/app/services/model/planRunDto';

@Component({
  selector: 'app-test-result-list',
  templateUrl: './test-result-list.component.html',
  styleUrls: ['./test-result-list.component.scss']
})
export class TestResultListComponent implements OnInit {

  planRuns: AdvancedPlanRunDto[] = [];

  constructor(private planRunService: PlanRunResourceService,
    private planService: PlanResourceService) { }

  ngOnInit(): void {
    this.planRunService.apiPlanrunGet().subscribe({
      next: planRunDtos => {
        planRunDtos.forEach(e => {
          this.planService.apiPlanIdGet(e.planId!).subscribe({
            next: planDto => {
              this.planRuns.push({
                planRun:e,
                plan: planDto
              })
            },
            error: err=> {
              console.log(err)
            }
          })
        })
      },
      error: err=>console.log(err)
    })
  }
}
