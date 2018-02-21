import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { AppComponent } from '../app.component';

import { SinkComponent } from '../modules/sink/sink.component';
import { LoginComponent } from '../modules/login/login.component';
import { DashboardComponent } from '../modules/dashboard/dashboard.component';

import { HttpService } from './services/http.service';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service'
 
const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [ AuthGuard ] },
    { path: 'sink', component: SinkComponent, canActivate: [ AuthGuard ] },
    // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [ HttpService ],
})

export class AppRoutingModule {}