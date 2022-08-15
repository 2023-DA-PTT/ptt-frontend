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

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      }
    }
  };

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ '0s', '1s', '2s', '3s', '4s', '5s', '6s' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Requests from US' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Requests from EU' }
    ]
  };

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      }
    }
  };
  public pieChartData: ChartConfiguration<'pie', number[], string | string[]>['data'] = {
    labels: [ [ 'US'], [ 'EU' ] ],
    datasets: [ {
      data: [ 300, 500 ]
    } ]
  };

  constructor() { }

  ngOnInit(): void {
  }

}
