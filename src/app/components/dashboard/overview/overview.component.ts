import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
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
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false
  };
  public lineChartLegend = true;

  constructor() { }

  ngOnInit(): void {
  }

}
