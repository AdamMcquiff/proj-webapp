import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { AppComponent } from '../app.component';

import { HttpService } from './services/http.service';

import { LoginComponent } from '../modules/authentication/login/login.component';
import { RegisterComponent } from '../modules/authentication/register/register.component';
import { ForgottenPasswordComponent } from '../modules/authentication/forgotten-password/forgotten-password.component'

import { AuthGuardService as AuthGuard } from '../modules/authentication/services/auth-guard.service';

import { DashboardComponent } from '../modules/dashboard/dashboard.component';

import { ProjectsComponent } from '../modules/projects/projects.component';
import { ProjectsDetailComponent } from '../modules/projects/projects-detail.component';
import { IterationsComponent } from '../modules/projects/iterations/iterations.component';
import { IterationsDetailComponent } from '../modules/projects/iterations/iterations-detail.component';
import { TasksComponent } from '../modules/projects/tasks/tasks.component';
import { TasksDetailComponent } from '../modules/projects/tasks/tasks-detail.component';
import { KanbanComponent } from '../modules/projects/kanban/kanban.component';

import { SearchComponent } from '../modules/projects/search/search.component';

import { ClientsComponent } from '../modules/clients/clients.component';
import { ClientsDetailComponent } from '../modules/clients/clients-detail.component';

import { TeamsComponent } from '../modules/teams/teams.component';

import { SinkComponent } from '../modules/sink/sink.component';
import { PageNotFoundComponent } from '../modules/page-not-found/page-not-found.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'forgotten-password', component: ForgottenPasswordComponent },
    
    { path: 'dashboard', component: DashboardComponent, canActivate: [ AuthGuard ] },
    
    { path: 'projects', component: ProjectsComponent, canActivate: [ AuthGuard ] },
    { path: 'projects/:id', component: ProjectsDetailComponent, canActivate: [ AuthGuard ] },
    { path: 'projects/:id/iterations', component: IterationsComponent, canActivate: [ AuthGuard ] },
    { path: 'projects/:id/iterations/:iterationId', component: IterationsDetailComponent, canActivate: [ AuthGuard ] },
    { path: 'projects/:id/tasks', component: TasksComponent, canActivate: [ AuthGuard ] },
    { path: 'projects/:id/tasks/:taskId', component: TasksDetailComponent, canActivate: [ AuthGuard ] },
    { path: 'projects/:id/kanban', component: KanbanComponent, canActivate: [ AuthGuard ] },
    
    { path: 'search/:terms', component: SearchComponent, canActivate: [ AuthGuard ] },

    { path: 'teams', component: TeamsComponent, canActivate: [ AuthGuard ] },
    
    { path: 'clients', component: ClientsComponent, canActivate: [ AuthGuard ] },
    { path: 'clients/:id', component: ClientsDetailComponent, canActivate: [ AuthGuard ] },
    
    { path: 'sink', component: SinkComponent, canActivate: [ AuthGuard ] },
    { path: '**', component: PageNotFoundComponent, canActivate: [ AuthGuard ] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [ HttpService ],
})

export class AppRoutingModule {}