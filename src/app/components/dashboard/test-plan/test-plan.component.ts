import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";

@Component({
  selector: 'app-test-plan',
  templateUrl: './test-plan.component.html',
  styleUrls: ['./test-plan.component.scss']
})
export class TestPlanComponent implements OnInit {
  id: number = -1;
  constructor(private activeRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    console.log(this.activeRoute.snapshot.params)
    if(!(this.activeRoute.snapshot.params['id']) || isNaN(parseInt(this.activeRoute.snapshot.params['id']!))) {
      this.router.navigate(['/']);
      return;
    }

    this.id = parseInt(this.activeRoute.snapshot.params['id']!);
    console.log(this.id)
  }

}
