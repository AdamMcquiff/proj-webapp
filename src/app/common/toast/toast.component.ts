import { Component, Input } from "@angular/core";

@Component({
  selector: "toast",
  templateUrl: "./toast.component.html",
})

export class ToastComponent {
  @Input() isOpen;
  @Input() message;
  
  closeDialog() {
    this.isOpen = false;
  }
}
