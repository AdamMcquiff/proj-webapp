import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "navigation",
  templateUrl: "./nav.component.html",
})

export class NavComponent {
  isSearchActive: boolean = false;

  constructor() {}

  ngOnInit(): void {

  }

  toggleSearch() {
    console.log('hit', this.isSearchActive, !this.isSearchActive)
    this.isSearchActive = !this.isSearchActive;
  }
}
