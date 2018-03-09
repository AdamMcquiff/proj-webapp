import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "navigation",
  templateUrl: "./nav.component.html",
})

export class NavComponent {
  isSearchMenuActive: boolean = false;
  isCreateMenuActive: boolean = false;
  isAvatarMenuActive: boolean = false;

  toggleSearchMenu() {
    this.resetMenus();
    this.isSearchMenuActive = !this.isSearchMenuActive;
  }

  toggleAddMenu() {
    this.resetMenus();
    this.isCreateMenuActive = !this.isCreateMenuActive;
  }

  toggleAvatarMenu() {
    this.resetMenus();
    this.isAvatarMenuActive = !this.isAvatarMenuActive;
  }

  private resetMenus() {
    this.isSearchMenuActive = false;
    this.isCreateMenuActive = false;
    this.isAvatarMenuActive = false;
  }
}
