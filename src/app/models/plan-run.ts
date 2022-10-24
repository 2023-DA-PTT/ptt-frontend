import {PlanDto} from "../services";
import {PlanRunDto} from "../services/model/planRunDto";

export interface AdvancedPlanRunDto {
    planRun: PlanRunDto;
    plan: PlanDto;
}
