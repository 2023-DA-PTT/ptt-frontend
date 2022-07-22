import { Card } from "flowbite-react";
import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import { PlanDto, PlanResourceService, StepDto, StepResourceService } from "../../../openapi";
import TestPlan from "../ListAll/ListAllTestplans";

export interface IValues {
    [key: string]: any;
}

export interface IFormState {
    testPlan: PlanDto,
    steps: StepDto[]
}

export const SingleTestPlan: React.FC = () => {
    const [testPlan, setTestPlan] = useState<PlanDto>({});
    const [steps, setSteps] = useState<StepDto[]>([]);
    const params = useParams();
    let testPlanId: undefined|number;

    useEffect(() => {
        if(testPlanId) {
            fetchTestPlanAndSteps(testPlanId)
        }
        }, []
    );

    if(params.id == undefined || isNaN(parseInt(params.id))) {
        return <p>404</p>;
    }

    testPlanId = parseInt(params.id);

    const fetchTestPlanAndSteps = async (actId: number) => {
        PlanResourceService.getApiPlan1(actId).then(testPlan => {
            setTestPlan(testPlan)
        });

        StepResourceService.getApiPlanStep(actId).then(steps => {
            setSteps(steps);
        });
    }

    return (
        <>
            <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                <div className="flex flex-col h-full items-center justify-center
                                    bg-gray-400 dark:bg-gray-700 dark:text-white">
                    <div className="text-3xl">{testPlan.name}</div>
                    <div className="text-xl mt-4">{testPlan.description}</div>
                </div>
            </div>
            { steps && steps.map(step =>
                <Link key={step.id} to={`/test-plan/${testPlan.id}/step/${step.id}`} >
                    <Card>
                        <h5 className="text-2xl font-bold tracking-tight
                                           text-gray-900 dark:text-white">
                            {step.name}
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            {step.description}
                        </p>
                    </Card>
                </Link>
            )
            }
        </>
    );

}