import { Component } from "@angular/core";

import { User } from "../../modules/authentication/user.model";

import { APIResponse } from "../interfaces/api-response.interface";

import { HttpService } from "../services/http.service";
import { AuthService } from "../../modules/authentication/services/auth.service";

@Component({
  selector: "primary-header",
  templateUrl: "./header.component.html",
})

export class HeaderComponent {
  user: User;

  isMenuOpen = {
    notifications: false
  }

  isSignoutConfirmationOpen: boolean;

  signoutDialogTitle = 'Signout';
  signoutDialogBody = {
    first_line: 'Are you sure you want to signout?',
    btn: {
      primary: 'Signout',
      secondary: 'No, don’t signout'
    }
  };

  constructor(public auth: AuthService, private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.get('profile')
      .subscribe((data: APIResponse) => {
        this.user = <User>data.data;
      });  
  } 
  
  toggleMenu(menu: string, isOpen: boolean) {
    let isMenuOpen = Object.assign({}, this.isMenuOpen);

    switch (menu) {
      case "notifications":
        this.isMenuOpen.notifications = isOpen;
        break;
    }
  }

  toggleDeleteConfirmationDialog() {
    this.isSignoutConfirmationOpen = !this.isSignoutConfirmationOpen;
  }

  onSignoutConfirmation(isPositiveConfirmation: boolean) {
    if (isPositiveConfirmation) this.signout();
  }

  public signout() {
    this.auth.signout();
  }
}
