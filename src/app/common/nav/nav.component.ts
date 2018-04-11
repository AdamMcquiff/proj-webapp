import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "navigation",
  templateUrl: "./nav.component.html",
})

export class NavComponent {
  isMenuOpen = {
    search: false,
    create: false,
    avatar: false,
    support: false
  }

  toggleMenu(menu: string) {
    let isMenuOpen = Object.assign({}, this.isMenuOpen);

    this.resetMenus(); 

    switch (menu) {
      case "search":
        this.isMenuOpen.search = !isMenuOpen.search;
        break;
      case "create":
        this.isMenuOpen.create = !isMenuOpen.create;
        break;
      case "avatar":
        this.isMenuOpen.avatar = !isMenuOpen.avatar;
        break;
      case "support":
        this.isMenuOpen.support = !isMenuOpen.support;
        break;
    }
  }

  private resetMenus() {
    Object.keys(this.isMenuOpen).map(key => {
      this.isMenuOpen[key] = false;
    });
  }
}
