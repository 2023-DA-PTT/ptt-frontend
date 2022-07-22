import { Card } from "flowbite-react";
import React, {useCallback, useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import { PlanDto, PlanResourceService, StepDto, StepResourceService } from "../../../openapi";


import ReactFlow, {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Connection,
    Edge,
    EdgeChange,
    Node,
    NodeChange
} from "react-flow-renderer";

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
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);

    const params = useParams();
    let testPlanId: undefined|number;

    useEffect(() => {
        if(testPlanId) {
            fetchTestPlanAndSteps(testPlanId)
        }
        }, []
    );

    const onNodesChange = useCallback(
        (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
    );
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );
    const onConnect = useCallback(
        (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges]
    );

    const getNodesOfSteps = (steps: StepDto[]): Node[] => {
        const actNodes: Node[] = [];

        let maxId = 0;

        steps.forEach((step, index) => {
            let stepId = step.id == undefined ? -1 : step.id;

            if(step.id == undefined)
                return;

            maxId = Math.max(maxId, stepId);

            actNodes.push({
                id: stepId.toString(),
                data: {
                        label: step.name
                    },
                position: {
                    x: 200 + (index*200),
                    y: 25
                }
            });
        });

        actNodes.push({
            id: (++maxId).toString(),
            type: 'input',
            data: { label: 'Test Start' },
            position: { x: 0, y: 25 },
        });

        actNodes.push({
            id: (++maxId).toString(),
            type: 'output',
            data: { label: 'Test End' },
            position: { x: (steps.length * 200)+200, y: 25 },
        });

        return actNodes;
    }

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
            setNodes(getNodesOfSteps(steps));
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
            <div className="h-96 w-full">
                { nodes && <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    fitView
                />}
            </div>
        </>
    );

}