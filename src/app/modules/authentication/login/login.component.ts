import { Component } from "@angular/core";
import { EmailValidator } from "@angular/forms";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

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
  
  serverErrors = {};

  private user: User;

  constructor(private httpService: HttpService, private formBuilder: FormBuilder, private router: Router, public auth: AuthService) {}

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
          let token = data.meta.token;
          localStorage.setItem('token', token);
          this.httpService.refreshToken(token);
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
