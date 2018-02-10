import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { AppComponent } from './app.component';
import { SinkComponent } from './sink.component';
 
const routes: Routes = [
    { path: 'sink', component: SinkComponent },
    // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}