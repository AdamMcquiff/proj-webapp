import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "search-menu",
  templateUrl: "./search-menu.component.html",
})

export class SearchMenuComponent {
  @Input() isOpen;

  toggleDialog() {
    this.isOpen = !this.isOpen;
  }
}
