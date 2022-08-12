import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NodeEditorComponent } from './components/node-editor/node-editor.component';
import { TestPlanDetailComponent } from './components/test-plan/test-plan-detail/test-plan-detail.component';
import { TestPlanListComponent } from './components/test-plan/test-plan-list/test-plan-list.component';
import { TestResultDetailComponent } from './components/test-result/test-result-detail/test-result-detail.component';
import { TestResultListComponent } from './components/test-result/test-result-list/test-result-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'test-plans', component: TestPlanListComponent },
  { path: 'editor', component: NodeEditorComponent },
  { path: 'test-plan/:id', component: TestPlanDetailComponent },
  { path: 'test-results', component: TestResultListComponent },
  { path: 'test-results/:id', component: TestResultDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
