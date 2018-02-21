import { Observable } from "rxjs/Observable";

import { Component } from "@angular/core";
import { EmailValidator } from "@angular/forms";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { HttpService } from "../../services/http.service";
import { User } from "../../models/user.model";
import { APIResponse } from "../../interfaces/api-response.interface";

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

  constructor(private httpService: HttpService, private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
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
