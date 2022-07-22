/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StepDto } from '../models/StepDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class StepResourceService {

    /**
     * @param planId 
     * @returns StepDto OK
     * @throws ApiError
     */
    public static getApiPlanStep(
planId: number,
): CancelablePromise<Array<StepDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/plan/{planId}/step',
            path: {
                'planId': planId,
            },
        });
    }

    /**
     * @param planId 
     * @param requestBody 
     * @returns StepDto OK
     * @throws ApiError
     */
    public static postApiPlanStep(
planId: number,
requestBody?: StepDto,
): CancelablePromise<StepDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/plan/{planId}/step',
            path: {
                'planId': planId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param planId 
     * @param stepId 
     * @returns StepDto OK
     * @throws ApiError
     */
    public static getApiPlanStep1(
planId: number,
stepId: number,
): CancelablePromise<StepDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/plan/{planId}/step/{stepId}',
            path: {
                'planId': planId,
                'stepId': stepId,
            },
        });
    }

}
