import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { AppComponent } from '../app.component';

import { HttpService } from './services/http.service';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

import { SinkComponent } from '../modules/sink/sink.component';
import { LoginComponent } from '../modules/login/login.component';
import { RegisterComponent } from '../modules/register/register.component';
import { ForgottenPasswordComponent } from '../modules/forgotten-password/forgotten-password.component';
import { DashboardComponent } from '../modules/dashboard/dashboard.component';
import { ProjectsComponent } from '../modules/projects/projects.component';
import { TeamsComponent } from '../modules/teams/teams.component';
import { ClientsComponent } from '../modules/clients/clients.component';
 
const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'forgotten-password', component: ForgottenPasswordComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [ AuthGuard ] },
    { path: 'projects', component: ProjectsComponent, canActivate: [ AuthGuard ] },
    { path: 'teams', component: TeamsComponent, canActivate: [ AuthGuard ] },
    { path: 'clients', component: ClientsComponent, canActivate: [ AuthGuard ] },
    { path: 'sink', component: SinkComponent, canActivate: [ AuthGuard ] },
    // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [ HttpService ],
})

export class AppRoutingModule {}