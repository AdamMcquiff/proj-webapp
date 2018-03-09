import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "add-menu",
  templateUrl: "./add-menu.component.html",
})

export class AddMenuComponent {
  @Input() isOpen;

  toggleDialog() {
    this.isOpen = !this.isOpen;
  }
}
