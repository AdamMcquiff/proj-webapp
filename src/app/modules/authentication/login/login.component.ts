import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators, EmailValidator } from "@angular/forms";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

import { Observable } from "rxjs/Observable";

import { User } from "../user.model";

import { APIResponse } from "../../../common/interfaces/api-response.interface";
import { HttpService } from "../../../common/services/http.service";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  providers: [ HttpService ]
})

export class LoginComponent {
  loginForm: FormGroup;
  
  serverErrors;

  private user: User;

  constructor(
    private httpService: HttpService, 
    private formBuilder: FormBuilder, 
    private router: Router, 
    public auth: AuthService,
    private location: Location
  ) {}

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) this.router.navigate(['dashboard'])

    this.loginForm = this.formBuilder.group({
      email: ["", [
        Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")
      ]],
      password: ["", [
        Validators.required,
        Validators.minLength(8)
      ]]
    });
  }

  public onFormSubmit() {
    if (!this.loginForm.valid) return;
  
    this.user = this.loginForm.value;

    this.httpService.post('authenticate', this.user)
      .subscribe(
        (data: APIResponse) => {
          let doesSessionStillExist = localStorage.getItem("prev_session") != null;
          let token = data.meta.token;
          localStorage.setItem('token', token);
          this.httpService.refreshToken(token);
          
          // If token exists, do hard reload to clear and user
          // relating to previously logged in user, if not 
          // redirect as normal
          if (doesSessionStillExist) {
            location.reload();
          } 
          this.router.navigate(['/dashboard']);
        },
        error => this.serverErrors = error
      );  
  }

  get email() { 
    return this.loginForm.get('email'); 
  }

  get password() { 
    return this.loginForm.get('password'); 
  }
}
