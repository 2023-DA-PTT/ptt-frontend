import { HttpStepDto } from './../../../../services/model/httpStepDto';
import { Component, OnInit } from '@angular/core';
import {
  DataPointDto,
  DataPointResourceService,
  HttpStepResourceService,
  PlanDto, PlanRunResourceService,
  StepDto,
  StepResourceService
} from "../../../../services";
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
  testDate: number = 0;

  public lineChartData: ChartConfiguration<'line'>['data'][] = [];

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false
  };
  public lineChartLegend = true;

  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private dataPointService: DataPointResourceService,
              private stepService: HttpStepResourceService,
              private testRunService: PlanRunResourceService) {
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

    this.stepService.apiPlanPlanIdStepHttpGet(this.testId).subscribe( steps => {
      this.testRunService.apiPlanrunPlanrunidGet(this.runId).subscribe(testRun => {
        this.testDate = testRun.startTime!;
        const testRunTime = testRun.startTime! * 1000; // TODO: test start time has 3 less 0es than datapoint start time
        console.log(testRunTime);
        steps.forEach(step => {
          this.dataPointService.apiDatapointPlanrunPlanRunIdStepStepIdGet(this.runId, step.id!).subscribe(dataPoints => {
            const labels: string[] = [];
            const data: number[] = [];

            dataPoints.forEach(dp => {
              labels.push(((dp.startTime! - testRunTime)/1000000) + 'ms');
              data.push(dp.duration! / 1000000);
            });

            if (labels.length == data.length && labels.length != 0) {
              this.lineChartData.push({
                labels: labels,
                datasets: [
                  {
                    data: data,
                    label: step.name,
                    fill: true,
                    tension: 0.5,
                    borderColor: 'gray',
                    backgroundColor: 'rgba(67,144,248,0.3)',
                    pointBorderWidth: 0.5
                  }
                ]
              });
            }
          })
        })
      })
    });
  }
}
