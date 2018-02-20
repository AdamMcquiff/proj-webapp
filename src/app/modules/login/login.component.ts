import { Observable } from "rxjs/Observable";

import { Component } from "@angular/core";
import { EmailValidator } from "@angular/forms";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { HttpService } from "../../services/http.service";
import { User } from "../../models/user.model";
import { APIResponse } from "../../interfaces/api-response.interface";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  providers: [
    HttpService, 
    EmailValidator
  ]
})

export class LoginComponent {
  title = "login";
  
  loginForm: FormGroup;
  
  serverErrors = { };

  private user: User;

  constructor(private httpService: HttpService, private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
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
          localStorage.setItem('token', data.meta.token);
          // this.router.navigate(['/dashboard']);
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
