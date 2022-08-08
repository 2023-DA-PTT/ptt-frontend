import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TestPlanListComponent } from './components/test-plan/test-plan-list/test-plan-list.component';
import { TestPlanDetailComponent } from './components/test-plan/test-plan-detail/test-plan-detail.component';
import { ApiModule, BASE_PATH } from './services';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StepDetailComponent } from './components/test-plan/test-plan-detail/step-detail/step-detail.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestResultListComponent } from './components/test-result/test-result-list/test-result-list.component';
import { TestResultDetailComponent } from './components/test-result/test-result-detail/test-result-detail.component';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TestPlanListComponent,
    TestPlanDetailComponent,
    FooterComponent,
    NavbarComponent,
    StepDetailComponent,
    TestResultListComponent,
    TestResultDetailComponent
  ],
  imports: [
    FormsModule,
    ApiModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), // ToastrModule added
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  providers: [{provide: BASE_PATH, useValue: environment.API_BASE_PATH}],
  bootstrap: [AppComponent]
})
export class AppModule { }
