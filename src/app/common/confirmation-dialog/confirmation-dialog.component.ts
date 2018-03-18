import { Component, Input, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "confirmation-dialog",
  templateUrl: "./confirmation-dialog.component.html"
})

export class ConfirmationDialogComponent {
  @Input() isOpen;
  @Input() title;
  @Input() body;
  @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}
  
  ngOnInit(): void {

  }

  closeDialog(confirmation: boolean) {
    this.notify.emit(confirmation);

    this.isOpen = false;
  }
}
 