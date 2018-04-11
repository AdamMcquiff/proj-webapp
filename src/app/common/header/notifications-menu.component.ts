import { Component, Input, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "notifications-menu",
  templateUrl: "./notifications-menu.component.html",
})

export class NotificationsMenuComponent {
  @Output() isOpenEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() isOpen;
  
  notifications: Object;

  toggleDialog() {
    this.isOpen = false;
    this.isOpenEmitter.emit(this.isOpen);
  }
}
