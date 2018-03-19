import { Component } from "@angular/core";
import { EmailValidator } from "@angular/forms";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { Observable } from "rxjs/Observable";

import { User } from "../user.model";

import { HttpService } from "../../../common/services/http.service";

import { AuthService } from "../services/auth.service";

@Component({
  selector: "register",
  templateUrl: "./register.component.html",
  providers: [ HttpService ]
})

export class RegisterComponent {
  isRegistered: boolean;

  registerForm: FormGroup;
  
  serverErrors = {};

  private user: User;

  constructor(private httpService: HttpService, private formBuilder: FormBuilder, private router: Router, public auth: AuthService) {}

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) this.router.navigate(['dashboard'])
    
    this.registerForm = this.formBuilder.group({
      name: ["", [
        Validators.required,
      ]],
      username: ["", [
        Validators.required,
      ]],
      email: ["", [
        Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")
      ]],
      password: ["", [
        Validators.required,
        Validators.minLength(8)
      ]],
      password_confirmation: ["", [
        Validators.required,
        Validators.minLength(8)
      ]] 
    });
  }

  public onFormSubmit() {
    if (!this.registerForm.valid) return;
  
    this.user = this.registerForm.value;

    this.httpService.post('register', this.user)
      .subscribe(
        data => this.isRegistered = true,
        error => {this.serverErrors = error; console.log(error)}
      );  
  }

  get name() { 
    return this.registerForm.get('email'); 
  }

  get username() { 
    return this.registerForm.get('password'); 
  }

  get email() { 
    return this.registerForm.get('email'); 
  }

  get password() { 
    return this.registerForm.get('password'); 
  }

  get confirmPassword() { 
    return this.registerForm.get('confirmPassword'); 
  }
}
