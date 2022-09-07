import {StepDto} from "../services";

export interface PlanStepData {
  step: StepDto,
  avgDuration: number,
  avgDifferenceToLastRun: number
}
