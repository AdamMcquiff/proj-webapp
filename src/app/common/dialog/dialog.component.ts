import { Component, Input } from "@angular/core";

@Component({
  selector: "base-dialog",
  templateUrl: "./dialog.component.html",
})

export class DialogComponent {
  @Input() isOpen;
  @Input() title;
  @Input() context;
  
  closeDialog() {
    this.isOpen = false;
  }
}
