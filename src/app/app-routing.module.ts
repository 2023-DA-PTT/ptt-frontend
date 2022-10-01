import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/webpage/home/home.component';
import { NodeEditorComponent } from './components/node-editor/node-editor.component';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {WebpageComponent} from "./components/webpage/webpage.component";
import {OverviewComponent} from "./components/dashboard/overview/overview.component";
import {TestPlanOverviewComponent} from "./components/dashboard/test-plan-overview/test-plan-overview.component";
import {TestPlanComponent} from "./components/dashboard/test-plan/test-plan.component";
import {StepComponent} from "./components/dashboard/test-plan/step/step.component";
import {StatsComponent} from "./components/dashboard/test-plan/stats/stats.component";
import {CompareComponent} from "./components/dashboard/test-plan/compare/compare.component";

const routes: Routes = [
  { path: '', component: WebpageComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'editor', component: NodeEditorComponent }
    ]
  },
  { path: 'dashboard', component: DashboardComponent, children: [
      { path: '', component: OverviewComponent },
      { path: 'test-plan', component: TestPlanOverviewComponent },
      { path: 'test-plan/:test-id', component: TestPlanComponent },
      { path: 'test-plan/:test-id/compare', component: CompareComponent },
      { path: 'test-plan/:test-id/step', pathMatch: 'full', redirectTo:'test-plan/:test-id' },
      { path: 'test-plan/:test-id/step/:step-id', component: StepComponent },
      { path: 'test-plan/:test-id/stats/:run-id', component: StatsComponent },
    ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
