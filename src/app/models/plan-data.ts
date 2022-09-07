import {PlanDto, PlanRunDto, StepDto} from "../services";
import {PlanStepData} from "./plan-step-data";

export interface PlanData {
  steps: PlanStepData[],
  plan: PlanDto,
  runs: PlanRunDto[]
}
