/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PlanDto } from '../models/PlanDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PlanResourceService {

    /**
     * @returns PlanDto OK
     * @throws ApiError
     */
    public static getApiPlan(): CancelablePromise<Array<PlanDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/plan',
        });
    }

    /**
     * @param userId 
     * @returns PlanDto OK
     * @throws ApiError
     */
    public static getApiPlanUser(
userId: number,
): CancelablePromise<Array<PlanDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/plan/user/{userId}',
            path: {
                'userId': userId,
            },
        });
    }

    /**
     * @param id 
     * @returns PlanDto OK
     * @throws ApiError
     */
    public static getApiPlan1(
id: number,
): CancelablePromise<PlanDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/plan/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param userId 
     * @param requestBody 
     * @returns PlanDto OK
     * @throws ApiError
     */
    public static postApiPlan(
userId: number,
requestBody?: PlanDto,
): CancelablePromise<PlanDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/plan/{userId}',
            path: {
                'userId': userId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
