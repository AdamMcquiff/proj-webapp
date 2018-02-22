import { Observable } from "rxjs/Observable";

import { Component } from "@angular/core";
import { EmailValidator } from "@angular/forms";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { HttpService } from "../../common/services/http.service";
import { User } from "../../common/models/user.model";
import { APIResponse } from "../../common/interfaces/api-response.interface";
import { AuthService } from "../../common/services/auth.service";

@Component({
  selector: "register",
  templateUrl: "./register.component.html",
  providers: [ HttpService ]
})

export class RegisterComponent {
  title = "register";
  
  registered = false;

  registerForm: FormGroup;
  
  serverErrors = {};

  private user: User;

  constructor(private httpService: HttpService, private formBuilder: FormBuilder, private router: Router, public auth: AuthService) {}

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) this.router.navigate(['dashboard'])
    
    // TODO: validate password against confirm password
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
    console.log(this.user)
    this.httpService.post('register', this.user)
      .subscribe(
        (data) => {
          console.log('hit')
          // localStorage.setItem('token', data.meta.token);
          this.registered = true;
          // this.router.navigate(['/dashboard']);
        },
        error => console.log(error)
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
