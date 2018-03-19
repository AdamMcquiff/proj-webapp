import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RequestOptions, Http } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { AppRoutingModule } from './common/app-routing.module'; 

import { AppComponent } from './app.component';

import { HttpService } from './common/services/http.service';

import { LoginComponent } from './modules/authentication/login/login.component';
import { RegisterComponent } from './modules/authentication/register/register.component';
import { ForgottenPasswordComponent } from './modules/authentication/forgotten-password/forgotten-password.component';
import { AuthService } from './modules/authentication/services/auth.service';
import { AuthGuardService } from './modules/authentication/services/auth-guard.service';

import { NavComponent } from './common/nav/nav.component';
import { SearchMenuComponent } from './common/nav/search-menu.component';
import { CreateMenuComponent } from './common/nav/create-menu.component';
import { AvatarMenuComponent } from './common/nav/avatar-menu.component';
import { HeaderComponent } from './common/header/header.component';
import { NotificationsMenuComponent } from './common/header/notifications-menu.component';
import { DialogComponent } from './common/dialog/dialog.component';
import { ConfirmationDialogComponent } from './common/confirmation-dialog/confirmation-dialog.component';
import { ToastComponent } from './common/toast/toast.component';

import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { WelcomeDialogComponent } from './modules/dashboard/welcome-dialog/welcome-dialog.component';
import { TasksDashboardWidgetComponent } from './modules/dashboard/tasks-widget/tasks.widget.component';
import { ProjectsDashboardWidgetComponent } from './modules/dashboard/projects-widget/projects.widget.component';

import { ProjectsComponent } from './modules/projects/projects.component';
import { ProjectsDetailComponent } from './modules/projects/projects-detail.component';
import { ProjectDialogComponent } from './modules/projects/project-dialog/project-dialog.component';
import { ProjectPeopleDialogComponent } from './modules/projects/project-dialog/project-people-dialog.component';
import { ProjectNavComponent } from './modules/projects/nav/project-nav.component';
import { IterationsComponent } from './modules/projects/iterations/iterations.component';
import { IterationsDetailComponent } from './modules/projects/iterations/iterations-detail.component';
import { IterationDialogComponent } from './modules/projects/iteration-dialog/iteration-dialog.component';
import { TasksComponent } from './modules/projects/tasks/tasks.component';
import { TasksDetailComponent } from './modules/projects/tasks/tasks-detail.component';
import { TaskDialogComponent } from './modules/projects/task-dialog/task-dialog.component';
import { KanbanComponent } from './modules/projects/kanban/kanban.component';
import { SearchComponent } from './modules/projects/search/search.component';

import { TeamsComponent } from './modules/teams/teams.component';

import { ClientsComponent } from './modules/clients/clients.component';
import { ClientsDetailComponent } from './modules/clients/clients-detail.component';
import { ClientDialogComponent } from './modules/clients/client-dialog/client-dialog.component';

import { SinkComponent } from './modules/sink/sink.component';

import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';

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
    SearchMenuComponent,
    CreateMenuComponent,
    AvatarMenuComponent,
    HeaderComponent,
    NotificationsMenuComponent,
    DialogComponent,
    ConfirmationDialogComponent,
    ToastComponent,
    LoginComponent, 
    RegisterComponent,
    ForgottenPasswordComponent,
    DashboardComponent,
    WelcomeDialogComponent,
    TasksDashboardWidgetComponent,
    ProjectsDashboardWidgetComponent,
    ProjectsComponent,
    ProjectsDetailComponent,
    ProjectDialogComponent,
    ProjectPeopleDialogComponent,
    ProjectNavComponent,
    IterationsComponent,
    IterationsDetailComponent,
    IterationDialogComponent,
    TasksComponent,
    TasksDetailComponent,
    TaskDialogComponent,
    KanbanComponent,
    SearchComponent,
    TeamsComponent,
    ClientsComponent,
    ClientsDetailComponent,
    ClientDialogComponent,
    SinkComponent,
    PageNotFoundComponent,
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
