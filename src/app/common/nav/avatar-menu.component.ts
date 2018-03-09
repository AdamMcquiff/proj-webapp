import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "avatar-menu",
  templateUrl: "./avatar-menu.component.html",
})

export class AvatarMenuComponent {
  @Input() isOpen;

  toggleDialog() {
    this.isOpen = !this.isOpen;
  }
}
