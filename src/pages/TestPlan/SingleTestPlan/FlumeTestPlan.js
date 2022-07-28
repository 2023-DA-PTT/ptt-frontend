import React from 'react'
import { FlumeConfig, NodeEditor, Colors, Controls } from "flume";
import { InputArgumentResourceService, OutputArgumentResourceService, PlanDto, PlanResourceService, StepDto, StepResourceService } from "../../../openapi";

const flumeConfig = new FlumeConfig();

flumeConfig  .addPortType({
  type: "string",
  name: "string",
  label: "Text",
  color: Colors.green,
  controls: [
    Controls.text({
      name: "string",
      label: "Text"
    })
  ]
})

class FlumeTestPlan extends React.Component {
  constructor(props) {
    super(props);

    this.state = {testPlan: {}}
  }

  async componentDidMount() {
    const actId = 1;
    PlanResourceService.getApiPlan1(actId).then(testPlan => {
      this.setState({testPlan: testPlan})
    })
    
    StepResourceService.getApiPlanStep(actId).then(async steps => {

      for (const step of steps) {
        const inputArg = await InputArgumentResourceService.getApiPlanStepInputArgument(actId, step.id);
        const outputArg = await OutputArgumentResourceService.getApiPlanStepOutputArgument(actId, step.id);
        flumeConfig.addNodeType({
          type: step.name,
          label: step.name,
          description: step.description,
          initialWidth: 170,
          inputs: ports => inputArg.map(arg => ports.string({name: arg.name, label: arg.name})),
          outputs: ports => outputArg.map(arg => ports.string({name: arg.name, label: arg.name}))
        })
        console.log(flumeConfig)
      }
      flumeConfig.addNodeType({
        type: "step.name",
        label: "step.name",
        description: "step.description",
        initialWidth: 170,
        inputs: ports =>[ports.string({label:"DU U"})],
        outputs: ports => [ports.string({label:"DU U"})]
      })


    })
  }

  render() {
    return flumeConfig && (
      <div style={{height:'75vh'}}>
        <NodeEditor
          portTypes={flumeConfig.portTypes}
          nodeTypes={flumeConfig.nodeTypes}
        />
      </div>
    )}
}
export default FlumeTestPlan;