import { Component } from "@angular/core";

import { HttpService } from "../services/http.service";
import { AuthService } from "../../modules/authentication/services/auth.service";

import { APIResponse } from "../interfaces/api-response.interface";
import { User } from "../../modules/authentication/user.model";

@Component({
  selector: "primary-header",
  templateUrl: "./header.component.html",
})

export class HeaderComponent {
  user: User;

  isMenuOpen = {
    notifications: false
  }

  constructor(public auth: AuthService, private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.get('profile')
      .subscribe((data: APIResponse) => {
        this.user = <User>data.data;
      });  
  } 
  
  toggleMenu(menu: string) {
    let isMenuOpen = Object.assign({}, this.isMenuOpen);

    switch (menu) {
      case "notifications":
        this.isMenuOpen.notifications = true;
        break;
    }
  }

  public signout() {
    this.auth.signout();
  }
}
