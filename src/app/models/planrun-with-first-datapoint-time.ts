import {PlanRunDto} from "../services";

export interface PlanrunWithFirstDatapointTime {
  planRun: PlanRunDto;
  firstDatapointTime: number;
}
