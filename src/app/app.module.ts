import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/webpage/home/home.component';
import { TestPlanListComponent } from './components/webpage/test-plan/test-plan-list/test-plan-list.component';
import { TestPlanDetailComponent } from './components/webpage/test-plan/test-plan-detail/test-plan-detail.component';
import { ApiModule, BASE_PATH } from './services';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/webpage/footer/footer.component';
import { NavbarComponent } from './components/webpage/navbar/navbar.component';
import { StepDetailComponent } from './components/webpage/test-plan/test-plan-detail/step-detail/step-detail.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/dashboard/sidebar/sidebar.component';
import { OverviewComponent } from './components/dashboard/overview/overview.component';
import { WebpageComponent } from './components/webpage/webpage.component';
import { TestPlanOverviewComponent } from './components/dashboard/test-plan-overview/test-plan-overview.component';
import { NgChartsModule } from 'ng2-charts';
import { TestPlanComponent } from './components/dashboard/test-plan/test-plan.component';
import { StepComponent } from './components/dashboard/test-plan/step/step.component';
import { StatsComponent } from './components/dashboard/test-plan/stats/stats.component';
import { NodeEditorComponent } from './components/node-editor/node-editor.component';
import { TestResultListComponent } from './components/test-result/test-result-list/test-result-list.component';
import { TestResultDetailComponent } from './components/test-result/test-result-detail/test-result-detail.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { ScriptStepComponent } from './components/dashboard/test-plan/step/script-step/script-step.component';
import {CodeEditorModule} from "@ngstack/code-editor";
import { HttpStepComponent } from './components/dashboard/test-plan/step/http-step/http-step.component';
import { InputParametersComponent } from './components/dashboard/test-plan/step/input-parameters/input-parameters.component';
import { OutputParametersComponent } from './components/dashboard/test-plan/step/output-parameters/output-parameters.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TestPlanListComponent,
    TestPlanDetailComponent,
    FooterComponent,
    NavbarComponent,
    StepDetailComponent,
    DashboardComponent,
    SidebarComponent,
    OverviewComponent,
    WebpageComponent,
    TestPlanOverviewComponent,
    TestPlanComponent,
    StepComponent,
    StatsComponent,
    NodeEditorComponent,
    TestResultListComponent,
    TestResultDetailComponent,
    ScriptStepComponent,
    HttpStepComponent,
    InputParametersComponent,
    OutputParametersComponent
  ],
  imports: [
    FormsModule,
    ApiModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgChartsModule,
    ToastrModule.forRoot(), // ToastrModule added
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    CodeEditorModule.forRoot()
  ],
  providers: [{provide: BASE_PATH, useValue: environment.API_BASE_PATH}],
  bootstrap: [AppComponent]
})
export class AppModule { }
