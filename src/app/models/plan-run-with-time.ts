import {PlanDto, PlanRunDto} from "../services";

export interface PlanRunWithTime {
  planRun: PlanRunDto;
  time: string;
}
