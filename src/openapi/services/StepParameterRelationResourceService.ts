/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StepParameterRelationDto } from '../models/StepParameterRelationDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class StepParameterRelationResourceService {

    /**
     * @param planId 
     * @param stepId 
     * @param requestBody 
     * @returns StepParameterRelationDto OK
     * @throws ApiError
     */
    public static postApiPlanStepParameterRelation(
planId: number,
stepId: number,
requestBody?: StepParameterRelationDto,
): CancelablePromise<StepParameterRelationDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/plan/{planId}/step/{stepId}/parameterRelation',
            path: {
                'planId': planId,
                'stepId': stepId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param planId 
     * @param stepId 
     * @returns StepParameterRelationDto OK
     * @throws ApiError
     */
    public static getApiPlanStepParameterRelationFrom(
planId: number,
stepId: number,
): CancelablePromise<Array<StepParameterRelationDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/plan/{planId}/step/{stepId}/parameterRelation/from',
            path: {
                'planId': planId,
                'stepId': stepId,
            },
        });
    }

    /**
     * @param planId 
     * @param stepId 
     * @returns StepParameterRelationDto OK
     * @throws ApiError
     */
    public static getApiPlanStepParameterRelationTo(
planId: number,
stepId: number,
): CancelablePromise<Array<StepParameterRelationDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/plan/{planId}/step/{stepId}/parameterRelation/to',
            path: {
                'planId': planId,
                'stepId': stepId,
            },
        });
    }

}
