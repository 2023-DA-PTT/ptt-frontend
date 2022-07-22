import { Card } from "flowbite-react";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PlanDto, PlanResourceService, StepDto, StepResourceService } from "../../../openapi";

export interface IValues {
    [key: string]: any;
}

export interface IFormState {
    testPlan: PlanDto,
    steps: StepDto[]
}

export default class SingleTestPlan extends React.Component<IValues, IFormState> {
    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = { 
            testPlan: {id: 0, name: "", description: ""},
            steps: []
        }
    }

    
    public componentDidMount(): void { 
        if(this.state.testPlan.id == null)
            return;

        const actId = this.state.testPlan.id;
            
        PlanResourceService.getApiPlan1(actId).then(testPlan => {
            this.setState({ testPlan: testPlan });
        })

        StepResourceService.getApiPlanStep(actId).then(steps => {
            this.setState({ steps: steps });
        })
    }

    render() {
        const steps = this.state.steps;
        const testPlan = this.state.testPlan;
        
        return (
            <>
                <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                    <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white text-3xl">
                        {testPlan.name}
                    </div>
                </div>
                { steps && steps.map(step => 
                    <Link to={`/test-plan/${testPlan.id}/step/${step.id}`} >
                        <Card>
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
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

}