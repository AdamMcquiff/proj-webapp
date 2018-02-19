import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SinkComponent } from './modules/sink/sink.component';
import { LoginComponent } from './modules/login/login.component';

import { AppRoutingModule }     from './app-routing.module'; 

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    SinkComponent,
    LoginComponent
  ],
  providers: [],
  bootstrap: [ AppComponent ],
})

export class AppModule {}
