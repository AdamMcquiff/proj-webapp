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
  
  registerForm: FormGroup;
  
  serverErrors = {};

  private user: User;

  constructor(private httpService: HttpService, private formBuilder: FormBuilder, private router: Router, public auth: AuthService) {}

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) this.router.navigate(['dashboard'])
    
    this.registerForm = this.formBuilder.group({
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
    if (!this.registerForm.valid) return;
  
    this.user = this.registerForm.value;

    this.httpService.post('authenticate', this.user)
      .subscribe(
        (data: APIResponse) => {
          localStorage.setItem('token', data.meta.token);
          this.router.navigate(['/dashboard']);
        },
        error => this.serverErrors = error
      );  
  }

  get email() { 
    return this.registerForm.get('email'); 
  }

  get password() { 
    return this.registerForm.get('password'); 
  }
}
