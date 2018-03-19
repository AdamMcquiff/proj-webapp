import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "notifications-menu",
  templateUrl: "./notifications-menu.component.html",
})

export class NotificationsMenuComponent {
  @Input() isOpen;
  
  notifications: Object;

  toggleDialog() {
    this.isOpen = !this.isOpen;
  }
}
