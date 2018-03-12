import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../services/auth.service";
import { HttpService } from "../services/http.service";

import { APIResponse } from "../interfaces/api-response.interface";

@Component({
  selector: "primary-header",
  templateUrl: "./header.component.html",
})

export class HeaderComponent {
  user: Object;

  constructor(public auth: AuthService, private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.get('profile')
      .subscribe((data: APIResponse) => {
        this.user = data.data;
      });  
  }

  public signout() {
    this.auth.signout();
  }
}
