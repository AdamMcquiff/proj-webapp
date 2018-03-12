import { Component, Input } from "@angular/core";

@Component({
  selector: "base-dialog",
  templateUrl: "./dialog.component.html",
})

export class DialogComponent {
  @Input() isOpen;

  constructor() {}

  ngOnInit(): void {

  }
}
