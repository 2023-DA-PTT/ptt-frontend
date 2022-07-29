/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OutputArgumentDto } from '../models/OutputArgumentDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class OutputArgumentResourceService {

    /**
     * @param planId 
     * @param stepId 
     * @returns OutputArgumentDto OK
     * @throws ApiError
     */
    public static getApiPlanStepOutputArgument(
planId: number,
stepId: number,
): CancelablePromise<Array<OutputArgumentDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/plan/{planId}/step/{stepId}/outputArgument',
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
     * @returns OutputArgumentDto OK
     * @throws ApiError
     */
    public static postApiPlanStepOutputArgument(
planId: number,
stepId: number,
requestBody?: OutputArgumentDto,
): CancelablePromise<OutputArgumentDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/plan/{planId}/step/{stepId}/outputArgument',
            path: {
                'planId': planId,
                'stepId': stepId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param outArgId 
     * @param planId 
     * @param stepId 
     * @returns OutputArgumentDto OK
     * @throws ApiError
     */
    public static getApiPlanStepOutputArgument1(
outArgId: number,
planId: number,
stepId: number,
): CancelablePromise<OutputArgumentDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/plan/{planId}/step/{stepId}/outputArgument/{outArgId}',
            path: {
                'outArgId': outArgId,
                'planId': planId,
                'stepId': stepId,
            },
        });
    }

}
