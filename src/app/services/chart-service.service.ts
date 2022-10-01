import { Injectable } from '@angular/core';
import {HttpStepDto} from "./model/httpStepDto";
import {ChartConfiguration} from "chart.js";
import {StepDto} from "./model/stepDto";
import {lastValueFrom, of} from "rxjs";
import {DataPointResultDto} from "../models/dataPointResultDto";
import {DataPointResourceService} from "./api/dataPointResource.service";

@Injectable({
  providedIn: 'root'
})
export class ChartServiceService {

  constructor(private dataPointService: DataPointResourceService) { }

  public getChartDataForPlanAndStep(planRunId: number,
                                     step: HttpStepDto,
                                     labels: number[],
                                     from: number,
                                     to: number,
                                     interval: number,
                                     label?: string,
                                     backgroundcolor?: string,
                                     offset?: number,
                                    startTimeOffset ?: number): Promise<ChartConfiguration<'line'>['data']> {
    return this.getDataArrayForTestStep(planRunId, step, labels, from, to, interval, offset, startTimeOffset).then(data => {
      return {
        labels: labels.map(label => (offset) ? label + "ms" : new Date(label).toLocaleTimeString()),
        datasets: [
          {
            data: data,
            label: label ? label : step.name,
            fill: true,
            tension: 0.5,
            borderColor: 'gray',
            backgroundColor: backgroundcolor ? backgroundcolor : 'rgba(67,144,248,0.3)',
            pointBorderWidth: 0.5
          }
        ],
      };
    });
  }

  public getDataArrayForTestStep(planRunId: number,
                          step: StepDto,
                          labels: number[],
                          from: number,
                          to: number,
                          interval: number,
                          offset ?: number,
                          startTimeOffset ?: number): Promise<number[]> {
    console.log("getting data . . . " + planRunId);
    return lastValueFrom(this.dataPointService.getDataPointsForStep(planRunId, step.id!,
      'max',
      offset ? from - offset : from,
      interval,
      offset ? to-offset : to)).then((dataPoints: DataPointResultDto[]) => {
      const data: number[] = [];
      let cnt = 0;

      dataPoints.forEach(dp => {
        let starttime = offset ? dp.start!+offset : dp.start!;

        if(startTimeOffset) {
          starttime = (starttime - startTimeOffset) / 1000;
        }

        while (labels[cnt] <= starttime) {
          data.push(0);
          cnt++;
        }

        data.push(dp.duration! / 1_000_000);
        cnt++;
      });

      while (labels.length > data.length) {
        data.push(0);
      }

      return data;
    });
  }
}
