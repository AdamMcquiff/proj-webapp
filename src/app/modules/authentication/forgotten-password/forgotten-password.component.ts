import { Component } from "@angular/core";
import { EmailValidator } from "@angular/forms";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { Observable } from "rxjs/Observable";

import { User } from "../user.model";

import { HttpService } from "../../../common/services/http.service";

import { AuthService } from "../services/auth.service";

@Component({
  selector: "forgotten-password",
  templateUrl: "./forgotten-password.component.html",
  providers: [ HttpService ]
})

export class ForgottenPasswordComponent {
  emailForm: FormGroup;
  
  serverErrors;

  emailSent = false;

  private user: User;

  constructor(private httpService: HttpService, private formBuilder: FormBuilder, private router: Router, public auth: AuthService) {}

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) this.router.navigate(['dashboard'])
    
    this.emailForm = this.formBuilder.group({
      email: ["", [
        Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")
      ]]
    });
  }

  public onFormSubmit() {
    if (!this.emailForm.valid) return;
  
    this.user = this.emailForm.value;

    this.httpService.post('password/email', this.user)
      .subscribe(
        data  => this.emailSent = true,
        error => console.log(error)
      );  
  }

  get email() { 
    return this.emailForm.get('email'); 
  }
}
