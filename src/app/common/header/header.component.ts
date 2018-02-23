import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../services/auth.service";

@Component({
  selector: "primary-header",
  templateUrl: "./header.component.html",
})

export class HeaderComponent {
  title = "header";

  constructor(public auth: AuthService) {}

  public signout() {
    this.auth.signout();
  }
}
