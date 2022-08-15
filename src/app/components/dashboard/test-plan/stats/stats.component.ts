import { Component, OnInit } from '@angular/core';
import {PlanDto, StepDto} from "../../../../services";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  testId: number = -1;
  runId: number = -1;
  testPlan: PlanDto = {id:-1,startId:-1,name:"Example test plan", description: "Test plan description"}
  step: StepDto = {id:-1,name:"Example test plan", description: "Test plan description", method: "POST", url: "https://google.com", body: "asdf"}

  constructor(private activeRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    console.log(this.activeRoute.snapshot.params)
    if(!(this.activeRoute.snapshot.params['test-id'])
      || !(this.activeRoute.snapshot.params['run-id'])
      || isNaN(parseInt(this.activeRoute.snapshot.params['test-id']!))
      || isNaN(parseInt(this.activeRoute.snapshot.params['run-id']!))) {
      this.router.navigate(['/']);
      return;
    }

    this.testId = parseInt(this.activeRoute.snapshot.params['test-id']!);
    this.runId = parseInt(this.activeRoute.snapshot.params['run-id']!);
  }
}
