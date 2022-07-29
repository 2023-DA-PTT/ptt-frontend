/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InputArgumentDto } from '../models/InputArgumentDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class InputArgumentResourceService {

    /**
     * @param planId 
     * @param stepId 
     * @returns InputArgumentDto OK
     * @throws ApiError
     */
    public static getApiPlanStepInputArgument(
planId: number,
stepId: number,
): CancelablePromise<Array<InputArgumentDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/plan/{planId}/step/{stepId}/inputArgument',
            path: {
                'planId': planId,
                'stepId': stepId,
            },
        });
    }

    /**
     * @param planId 
     * @param stepId 
     * @param requestBody 
     * @returns InputArgumentDto OK
     * @throws ApiError
     */
    public static postApiPlanStepInputArgument(
planId: number,
stepId: number,
requestBody?: InputArgumentDto,
): CancelablePromise<InputArgumentDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/plan/{planId}/step/{stepId}/inputArgument',
            path: {
                'planId': planId,
                'stepId': stepId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param inArgId 
     * @param planId 
     * @param stepId 
     * @returns InputArgumentDto OK
     * @throws ApiError
     */
    public static getApiPlanStepInputArgument1(
inArgId: number,
planId: number,
stepId: number,
): CancelablePromise<InputArgumentDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/plan/{planId}/step/{stepId}/inputArgument/{inArgId}',
            path: {
                'inArgId': inArgId,
                'planId': planId,
                'stepId': stepId,
            },
        });
    }

}
