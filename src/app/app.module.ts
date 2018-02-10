import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SinkComponent } from './sink.component';

import { AppRoutingModule }     from './app-routing.module'; 

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    SinkComponent
  ],
  providers: [],
  bootstrap: [ AppComponent ],
})

export class AppModule {}
