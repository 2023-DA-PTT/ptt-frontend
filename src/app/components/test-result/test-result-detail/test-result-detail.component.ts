import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TestResultGraphItem } from 'src/app/models/test-result-graph-item';
import { DataPointResourceService, HttpStepResourceService, PlanDto, PlanResourceService, PlanRunResourceService, StepResourceService } from 'src/app/services';
import { DataPointDto } from 'src/app/services/model/dataPointDto';
import { PlanRunDto } from 'src/app/services/model/planRunDto';

@Component({
  selector: 'app-test-result-detail',
  templateUrl: './test-result-detail.component.html',
  styleUrls: ['./test-result-detail.component.scss']
})
export class TestResultDetailComponent implements OnInit {

  planRun: PlanRunDto | null = null;
  plan: PlanDto | null = null;
  graphItems: TestResultGraphItem[] = [];

  constructor(private planRunService: PlanRunResourceService,
    private planService: PlanResourceService,
    private stepService: HttpStepResourceService,
    private dataPointService: DataPointResourceService,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      var id: number = +params['id'];
      if (!id) {
        return;
      }

      this.planRunService.getPlanRunById(id).subscribe({
        next: planRun => {
          this.planRun = planRun;
          this.planService.getPlanById(planRun.planId!).subscribe({
            next: d => {
              this.plan = d;
              this.stepService.getAllHttpStepsForPlan(this.plan.id!).subscribe({
                next: steps=> {
                  steps.forEach(step => {
                    this.dataPointService.getDataPointsForStep(planRun.id!, step.id!).subscribe({
                      next: (dataPoints: DataPointDto[]) => {
                        dataPoints.sort((a,b)=>a.startTime! - b.startTime!);
                        const xAxisData: string[] = [];
                        const yAxisData: number[] = [];
                        dataPoints.forEach((v)=>{
                          let now: Date = new Date(v.startTime!);
                          xAxisData.push([now.getFullYear(), now.getMonth(), now.getDate(),now.getHours(), now.getMinutes(), now.getSeconds()].join('/'))
                          yAxisData.push(v.duration!/(10*10*10*10*10*10)); //from nano to milli
                        });
                        this.graphItems.push({
                          option: {
                          legend: {
                            data: ['measurements'],
                            align: 'left',
                          },
                          tooltip: {},
                          xAxis: {
                            data: xAxisData,
                            silent: false,
                            splitLine: {
                              show: false,
                            },
                          },
                          yAxis: {},
                          series: [
                            {
                              name: 'measurements',
                              type: 'line',
                              data: yAxisData,
                              showSymbol: false,
                              hoverAnimation: false,
                            }
                          ]
                        },
                        step: step});
                      },
                      error: err=>console.log(err)
                    })
                  });
                },
                error: err=> {
                  console.log(err);
                }
              });
            },
            error: err=>console.log(err)
          })
        }
      })
    });
  }
}
