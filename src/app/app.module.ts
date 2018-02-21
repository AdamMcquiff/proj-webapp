import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RequestOptions, Http } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { AppComponent } from './app.component';
import { SinkComponent } from './modules/sink/sink.component';
import { NavComponent } from './common/nav/nav.component';
import { LoginComponent } from './modules/login/login.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';

import { AppRoutingModule } from './common/app-routing.module'; 
import { HttpService } from './common/services/http.service';
import { AuthService } from './common/services/auth.service';
import { AuthGuardService } from './common/services/auth-guard.service';


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
    SinkComponent,
    LoginComponent,
    DashboardComponent
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
