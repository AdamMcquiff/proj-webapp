import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "navigation",
  templateUrl: "./nav.component.html",
})

export class NavComponent {
  isMenuOpen: boolean = false;
  isSearchActive: boolean = false;

  toggleSearch() {
    this.isSearchActive = !this.isSearchActive;
    this.isMenuOpen = this.isSearchActive;
  }
}
