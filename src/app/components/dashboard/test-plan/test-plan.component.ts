import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {
  HttpStepDto,
  HttpStepResourceService, PlanResourceService, PlanRunDto, PlanRunResourceService,
  ScriptStepDto,
  ScriptStepResourceService,
  StepDto,
  StepParameterRelationResourceService,
  StepResourceService,
  StepWithNextsDto
} from "../../../services";
import {ScriptStepComponent} from "./step/script-step/script-step.component";
import {HttpStepComponent} from "./step/http-step/http-step.component";
import {formatDate} from "@angular/common";
import { NgForm } from '@angular/forms';
import { NodeResourceService } from 'src/app/services/api/nodeResource.service';
import { Toast, ToastrComponentlessModule, ToastrService } from 'ngx-toastr';
import { Edge, Node } from '@swimlane/ngx-graph';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-test-plan',
  templateUrl: './test-plan.component.html',
  styleUrls: ['./test-plan.component.scss']
})
export class TestPlanComponent implements OnInit {
  id: number = -1;
  steps: StepWithNextsDto[] = [];
  createNewStepModal = false;
  createNewPlanRunModal = false;
  actTestPlanRun: PlanRunDto = {runOnce:true,startTime: 0, duration: 0, planRunInstructions: []};
  testRuns: PlanRunDto[] = [];
  nodeLocations: string[] = [];

  graphNodes : Node[] = []
  graphLinks : Edge[] = []
  center$: Subject<boolean> = new Subject();

  constructor(private activeRoute: ActivatedRoute,
              private toastr: ToastrService,
              private router: Router,
              private httpStepsService: HttpStepResourceService,
              private scriptStepService: ScriptStepResourceService,
              private stepService: StepResourceService,
              private testRunService: PlanRunResourceService,
              private nodeService: NodeResourceService,
              private planService: PlanResourceService,
              private relationService: StepParameterRelationResourceService) {
  }

  clearActPlanRun() {
    this.actTestPlanRun = {planId: this.id, runOnce:true,startTime: 0, duration: 0, planRunInstructions: []};
  }

  ngOnInit(): void {
    if(!(this.activeRoute.snapshot.params['test-id']) || isNaN(parseInt(this.activeRoute.snapshot.params['test-id']!))) {
      this.router.navigate(['/']);
      return;
    }

    this.id = parseInt(this.activeRoute.snapshot.params['test-id']!);
    this.clearActPlanRun();

    this.stepService.apiPlanPlanIdStepGet(this.id).subscribe(steps => {
      this.steps=steps;
      this.steps.forEach(e => {
        this.graphNodes.push({id: e.id!.toString(), label: e.name})
        e.nexts?.forEach(n=> {
          this.graphLinks.push({
            source: n.fromStepId!.toString(),
            target: n.toStepId!.toString(),
            label: n.repeatAmount?.toString()
          })})
        })
    });

    this.testRunService.apiPlanrunPlanPlanIdGet(this.id).subscribe(runs => {
      this.testRuns = runs;
    })

    this.nodeService.apiNodeLocationsGet().subscribe(locations => {
      this.nodeLocations = Array.from(locations.values());
    })
  }

  downloadFile(data: string, type: string) {
    const blob = new Blob([data], { type: type });
    const url= window.URL.createObjectURL(blob);
    window.open(url)
  }

  exportTestPlan() {
    this.planService.apiPlanExportIdGet(this.id).subscribe(
      d=> this.downloadFile(JSON.stringify(d), 'application/json')
    )
  }

  createNewStep(type: string) {
    if(type == 'http') {
      this.router.navigate(["/dashboard/test-plan/"+ this.id + "/step/http"]).then();
    }
    else if(type == 'script') {
      this.router.navigate(["/dashboard/test-plan/" + this.id + "/step/script"]).then();
    }
  }

  formatTestRunTime(testRun: PlanRunDto) {
    return formatDate(new Date(testRun.startTime!), 'MMM d y, h:mm:ss a', navigator.language);
  }

  formatTestRunDuration(testRun: PlanRunDto) {
    const d = new Date(testRun.duration!*1000);
    const seconds = d.getUTCSeconds();
    const minutes = d.getUTCMinutes();
    const hours = d.getUTCHours();
    const days = d.getDate()-1;
    let str = "";
    if(days != 0) str += days + " days";
    if(hours != 0) str += hours + " h";
    if(minutes != 0) str += minutes + " min";
    if(seconds != 0) str += seconds + " s";
    return str;
  }
  
  onSubmit(createNewTestPlanRunForm: NgForm) : void {
    this.testRunService.apiPlanrunPost(this.actTestPlanRun).subscribe({
      next: d=> {
        this.toastr.success("Started Plan Run", "Plan Run");
      }
    })
    this.createNewPlanRunModal = false;
    this.clearActPlanRun();
  }

  addNewPlanInstructionParam() {
    this.actTestPlanRun.planRunInstructions?.push({numberOfClients: 1, nodeName: this.nodeLocations[0]})
  }
}
