import {Component, Input, OnInit} from '@angular/core';
import {Edge, Node} from "@swimlane/ngx-graph";
import {Subject} from "rxjs";
import {StepResourceService} from "../../services";

@Component({
  selector: 'app-plan-node-view',
  templateUrl: './plan-node-view.component.html',
  styleUrls: ['./plan-node-view.component.scss']
})
export class PlanNodeViewComponent implements OnInit {
  graphNodes : Node[] = []
  graphLinks : Edge[] = []
  center$: Subject<boolean> = new Subject();

  @Input()
  planId: number = -1;

  constructor(private stepService: StepResourceService) { }

  ngOnInit(): void {
    this.stepService.getAllStepsForPlan(this.planId).subscribe(steps => {
      var nodes :Node[] = []
      var edges : Edge[] = []

      steps.forEach(e => {
        nodes.push({id: e.id!.toString(), label: e.name})
        e.nexts?.forEach(n=> {
          edges.push({
            source: n.fromStepId!.toString(),
            target: n.toStepId!.toString(),
            label: n.repeatAmount?.toString()
          })})
      })
      this.graphNodes = nodes;
      this.graphLinks = edges;
    });
  }

}
