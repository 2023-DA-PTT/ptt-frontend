import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {
  HttpStepResourceService, MetricsResourceService,
  PlanResourceService,
  PlanRunDto,
  PlanRunResourceService,
  ScriptStepResourceService,
  StepParameterRelationResourceService,
  StepResourceService,
  StepWithNextsDto
} from "../../../services";
import {formatDate} from "@angular/common";
import {NgForm} from '@angular/forms';
import {NodeResourceService} from 'src/app/services/api/nodeResource.service';
import {ToastrService} from 'ngx-toastr';
import {PlanRunWithTime} from "../../../models/plan-run-with-time";


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
  actTestPlanRun: PlanRunDto = {runOnce:true,startTime: 0, duration: 0, planRunInstructions: [], name: ''};
  testRuns: PlanRunWithTime[] = [];
  nodeLocations: string[] = [];

  constructor(private activeRoute: ActivatedRoute,
              private toastr: ToastrService,
              private router: Router,
              private httpStepsService: HttpStepResourceService,
              private scriptStepService: ScriptStepResourceService,
              private stepService: StepResourceService,
              private testRunService: PlanRunResourceService,
              private nodeService: NodeResourceService,
              private planService: PlanResourceService,
              private relationService: StepParameterRelationResourceService,
              private metricsService: MetricsResourceService) {
  }

  clearActPlanRun() {
    this.actTestPlanRun = {planId: this.id, runOnce:true,startTime: 0, duration: 0, planRunInstructions: [], name: ''};
  }

  ngOnInit(): void {
    if(!(this.activeRoute.snapshot.params['test-id']) || isNaN(parseInt(this.activeRoute.snapshot.params['test-id']!))) {
      this.router.navigate(['/']);
      return;
    }

    this.id = parseInt(this.activeRoute.snapshot.params['test-id']!);
    this.clearActPlanRun();

    this.stepService.getAllStepsForPlan(this.id).subscribe(steps => {
      this.steps=steps;
    });

    this.testRunService.getPlanRunsForPlan(this.id).subscribe(runs => {
      runs.forEach(run => {
        const runWithTime = {planRun: run, time: ""}
        this.metricsService.getPlanRunDuration(run.id!).subscribe(duration => {
          console.log(this.formatTestRunDuration(duration))
          runWithTime.time = this.formatTestRunDuration(duration);
        });
        this.testRuns.push(runWithTime);
      })
    })

    this.nodeService.getAllNodeLocations().subscribe(locations => {
      this.nodeLocations = Array.from(['any',...locations]);
    })
  }

  downloadFile(data: string, type: string) {
    const blob = new Blob([data], { type: type });
    const url= window.URL.createObjectURL(blob);
    window.open(url)
  }

  exportTestPlan() {
    this.planService._export(this.id).subscribe(
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

  formatTestRunDuration(duration: number) {
    const d = new Date(duration!);
    const seconds = d.getUTCSeconds();
    const minutes = d.getUTCMinutes();
    const hours = d.getUTCHours();
    const days = d.getDate()-1;
    let str = "";
    if(days != 0) str += days + " days ";
    if(hours != 0) str += hours + "h ";
    if(minutes != 0) str += minutes + "m ";
    if(seconds != 0) str += seconds + "s ";
    return str;
  }

  onSubmit(createNewTestPlanRunForm: NgForm) : void {
    this.testRunService.createPlanRun(this.actTestPlanRun).subscribe({
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
