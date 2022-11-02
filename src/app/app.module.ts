import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './components/webpage/home/home.component';
import {ApiModule, BASE_PATH} from './services';
import {HttpClientModule} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {FooterComponent} from './components/webpage/footer/footer.component';
import {NavbarComponent} from './components/webpage/navbar/navbar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {SidebarComponent} from './components/dashboard/sidebar/sidebar.component';
import {OverviewComponent} from './components/dashboard/overview/overview.component';
import {WebpageComponent} from './components/webpage/webpage.component';
import {TestPlanOverviewComponent} from './components/dashboard/test-plan-overview/test-plan-overview.component';
import {NgChartsModule} from 'ng2-charts';
import {TestPlanComponent} from './components/dashboard/test-plan/test-plan.component';
import {StepComponent} from './components/dashboard/test-plan/step/step.component';
import {StatsComponent} from './components/dashboard/test-plan/stats/stats.component';
import {NodeEditorComponent} from './components/node-editor/node-editor.component';
import {NgxEchartsModule} from 'ngx-echarts';
import {ScriptStepComponent} from './components/dashboard/test-plan/step/script-step/script-step.component';
import {CodeEditorModule} from "@ngstack/code-editor";
import {HttpStepComponent} from './components/dashboard/test-plan/step/http-step/http-step.component';
import {
  InputParametersComponent
} from './components/dashboard/test-plan/step/input-parameters/input-parameters.component';
import {
  OutputParametersComponent
} from './components/dashboard/test-plan/step/output-parameters/output-parameters.component';
import {NextStepsComponent} from './components/dashboard/test-plan/step/next-steps/next-steps.component';
import {NgxGraphModule} from '@swimlane/ngx-graph';
import {PlanNodeViewComponent} from './components/plan-node-view/plan-node-view.component';
import {
  TestRunStepDataCardComponent
} from './components/dashboard/overview/test-run-step-data-card/test-run-step-data-card.component';
import {CompareComponent} from './components/dashboard/test-plan/compare/compare.component';
import {IntervalSelectComponent} from './components/dashboard/test-plan/interval-select/interval-select.component';
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'https://auth.perftest.tech',
        realm: 'master',
        clientId: 'backend-service'
      },
      initOptions: {
        flow: "implicit"
      }
    });
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    DashboardComponent,
    SidebarComponent,
    OverviewComponent,
    WebpageComponent,
    TestPlanOverviewComponent,
    TestPlanComponent,
    StepComponent,
    StatsComponent,
    NodeEditorComponent,
    ScriptStepComponent,
    HttpStepComponent,
    InputParametersComponent,
    OutputParametersComponent,
    NextStepsComponent,
    PlanNodeViewComponent,
    TestRunStepDataCardComponent,
    CompareComponent,
    IntervalSelectComponent
  ],
    imports: [
      KeycloakAngularModule,
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
        CodeEditorModule.forRoot({
          baseUrl: 'assets/monaco',
          typingsWorkerUrl: 'assets/workers/typings-worker.js'
        }),
        ReactiveFormsModule,
        NgxGraphModule
    ],
  providers: [{provide: BASE_PATH, useValue: environment.API_BASE_PATH},
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
