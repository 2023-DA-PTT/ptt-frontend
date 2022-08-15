import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/webpage/home/home.component';
import { TestPlanDetailComponent } from './components/webpage/test-plan/test-plan-detail/test-plan-detail.component';
import { TestPlanListComponent } from './components/webpage/test-plan/test-plan-list/test-plan-list.component';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {WebpageComponent} from "./components/webpage/webpage.component";
import {OverviewComponent} from "./components/dashboard/overview/overview.component";
import {TestPlanOverviewComponent} from "./components/dashboard/test-plan-overview/test-plan-overview.component";
import {TestPlanComponent} from "./components/dashboard/test-plan/test-plan.component";
import {StepComponent} from "./components/dashboard/test-plan/step/step.component";
import {StatsComponent} from "./components/dashboard/test-plan/stats/stats.component";

const routes: Routes = [
  { path: '', component: WebpageComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'test-plans', component: TestPlanListComponent },
      { path: 'test-plan/:id', component: TestPlanDetailComponent },
    ]
  },
  { path: 'dashboard', component: DashboardComponent, children: [
      { path: '', component: OverviewComponent },
      { path: 'test-plan-overview', component: TestPlanOverviewComponent },
      { path: 'test-plan/:test-id', component: TestPlanComponent },
      { path: 'test-plan/:test-id/step/:step-id', component: StepComponent },
      { path: 'test-plan/:test-id/stats/:run-id', component: StatsComponent },
    ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
