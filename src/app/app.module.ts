import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SinkComponent } from './modules/sink/sink.component';
import { LoginComponent } from './modules/login/login.component';

import { AppRoutingModule }     from './app-routing.module'; 
import { HttpService } from './services/http.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    SinkComponent,
    LoginComponent
  ],
  providers: [ HttpService ],
  bootstrap: [ AppComponent ],
})

export class AppModule {}
