import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { AppComponent } from './app.component';
import { SinkComponent } from './modules/sink/sink.component';
import { LoginComponent } from './modules/login/login.component';
import { HttpService } from './services/http.service';
 
const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'sink', component: SinkComponent },
    // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [ HttpService ],
})
export class AppRoutingModule {}