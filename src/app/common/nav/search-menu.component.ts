import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "search-menu",
  templateUrl: "./search-menu.component.html",
})

export class SearchMenuComponent {
  @Input() isOpen;

  constructor(private router: Router) {}

  submitSearch(input) {
    this.router.navigate(['/search', input.target.value.trim()]);
    this.toggleDialog();
  }

  toggleDialog() {
    this.isOpen = !this.isOpen;
  }
}
