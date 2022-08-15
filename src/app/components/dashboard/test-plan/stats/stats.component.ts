import { Component, OnInit } from '@angular/core';
import {PlanDto, StepDto} from "../../../../services";
import {ActivatedRoute, Router} from "@angular/router";
import {ChartConfiguration, ChartOptions} from "chart.js";

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

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      '0s',
      '1s',
      '2s',
      '3s',
      '4s',
      '5s',
      '6s',
      '7s'
    ],
    datasets: [
      {
        data: [ 35.0, 31.0, 37.0, 80.0, 89.3, 34.1, 25.3, 24.1 ],
        label: 'Sign Up',
        fill: true,
        tension: 0.5,
        borderColor: 'gray',
        backgroundColor: 'rgba(67,144,248,0.3)',
        pointBorderWidth: 0.5
      },
      {
        data: [ 39.0, 74.0, 12.0, 130.0, 99.3, 33.1, 7.3, 1.1 ],
        label: 'Log in',
        fill: true,
        tension: 0.5,
        borderColor: 'gray',
        backgroundColor: 'rgba(187,44,163,0.3)',
        pointBorderWidth: 0.5
      }
    ]
  };

  public lineChartDataSingle: ChartConfiguration<'line'>['data'] = {
    labels: [
      '0s',
      '1s',
      '2s',
      '3s',
      '4s',
      '5s',
      '6s',
      '7s'
    ],
    datasets: [
      {
        data: [ 35.0, 31.0, 37.0, 80.0, 89.3, 34.1, 25.3, 24.1 ],
        label: 'Log In',
        fill: true,
        tension: 0.5,
        borderColor: 'gray',
        backgroundColor: 'rgba(67,144,248,0.3)',
        pointBorderWidth: 0.5
      }
    ]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false
  };
  public lineChartLegend = true;

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
