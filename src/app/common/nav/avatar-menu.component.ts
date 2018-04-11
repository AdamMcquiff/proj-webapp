import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

import { User } from "../../modules/authentication/user.model";

import { APIResponse } from "../interfaces/api-response.interface";
import { HttpService } from "../services/http.service";

import { AuthService } from "../../modules/authentication/services/auth.service";

@Component({
  selector: "avatar-menu",
  templateUrl: "./avatar-menu.component.html",
})

export class AvatarMenuComponent {
  @Input() isOpen;

  user: User;

  constructor(public auth: AuthService, private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.get('profile')
      .subscribe((data: APIResponse) => {
        this.user = <User>data.data;
      });  
  }

  toggleDialog() {
    this.isOpen = !this.isOpen;
  }
}
