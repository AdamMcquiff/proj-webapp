import { Observable } from "rxjs/Observable";

import { Component } from "@angular/core";
import { EmailValidator } from "@angular/forms";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { HttpService } from "../../services/http.service";
import { User } from "../../models/user.model";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  providers: [HttpService, EmailValidator]
})

export class LoginComponent {
  title = "login";
  loginForm: FormGroup;
  private user: User;

  constructor(private httpService: HttpService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
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

    // this.httpService.get('')
    //   .subscribe(data => {
    //       console.log(data)
    //   });  
  }

  get email() { 
    return this.loginForm.get('email'); 
  }

  get password() { 
    return this.loginForm.get('password'); 
  }
}
