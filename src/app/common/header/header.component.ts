import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "primary-header",
  templateUrl: "./header.component.html",
})

export class HeaderComponent {
  title = "header";

  constructor() {}
}
