import { Card } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import { PlanDto, PlanResourceService } from "../../../openapi";

export interface IValues {
    [key: string]: any;
}

export interface IFormState {
    testPlans: PlanDto[]
}

export default class TestPlan extends React.Component<IValues, IFormState> {

    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = { testPlans: [] }
    }

    
    public componentDidMount(): void { 
        PlanResourceService.getApiPlan().then(testPlans => {
            this.setState({ testPlans: [...testPlans] });
        })
    }

    render() {
        const testPlans = this.state.testPlans;
        return (
            <>
                <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                    <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white text-3xl">
                        Test Plans
                    </div>
                </div>
                { testPlans && testPlans.map(plan => 
                    <Link to={`/test-plan/${plan.id}`} >
                        <Card>
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {plan.name}
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                {plan.description}
                            </p>
                        </Card>
                    </Link>
                )
                }
            </>
        );
    }

}