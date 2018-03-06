import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RequestOptions, Http } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { AppRoutingModule } from './common/app-routing.module'; 

import { HttpService } from './common/services/http.service';
import { AuthService } from './common/services/auth.service';
import { AuthGuardService } from './common/services/auth-guard.service';

import { AppComponent } from './app.component';

import { NavComponent } from './common/nav/nav.component';
import { HeaderComponent } from './common/header/header.component';

import { SinkComponent } from './modules/sink/sink.component';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';

import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
import { ForgottenPasswordComponent } from './modules/forgotten-password/forgotten-password.component';

import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { TasksDashboardWidgetComponent } from './modules/dashboard/widgets/tasks/tasks.widget.component';
import { ProjectsDashboardWidgetComponent } from './modules/dashboard/widgets/projects/projects.widget.component';

import { TeamsComponent } from './modules/teams/teams.component';
import { ClientsComponent } from './modules/clients/clients.component';

import { ProjectsComponent } from './modules/projects/projects.component';
import { ProjectNavComponent } from './modules/projects/project-nav.component';
import { ProjectsDetailComponent } from './modules/projects/projects-detail.component';
import { IterationsComponent } from './modules/projects/iterations.component';
import { IterationsDetailComponent } from './modules/projects/iterations-detail.component';
import { TasksComponent } from './modules/projects/tasks.component';
import { TasksDetailComponent } from './modules/projects/tasks-detail.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig(), http, options);
}

@NgModule({
  imports: [
    BrowserModule, 
    HttpClientModule,
    AppRoutingModule,                        
    ReactiveFormsModule                
  ],
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent,
    SinkComponent,
    PageNotFoundComponent,
    LoginComponent, 
    RegisterComponent,
    ForgottenPasswordComponent,
    DashboardComponent,
    TasksDashboardWidgetComponent,
    ProjectsDashboardWidgetComponent,
    ProjectsComponent,
    ProjectNavComponent,
    ProjectsDetailComponent,
    IterationsComponent,
    IterationsDetailComponent,
    TasksComponent,
    TasksDetailComponent,
    TeamsComponent,
    ClientsComponent
  ],
  providers: [ 
    HttpService, 
    AuthService, 
    AuthGuardService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [ Http, RequestOptions ]
    }
  ],
  bootstrap: [ 
    AppComponent 
  ],
})

export class AppModule {}
