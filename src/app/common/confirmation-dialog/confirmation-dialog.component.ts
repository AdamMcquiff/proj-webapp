import { Component, Input, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "confirmation-dialog",
  templateUrl: "./confirmation-dialog.component.html"
})

export class ConfirmationDialogComponent {
  @Input() isOpen;
  @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();

  title = 'Are you sure?';
  body = {
    first_line: 'Are you sure you want to delete?',
    second_line: 'This action is permenant and cannot be undone.'
  }

  constructor() {}
  
  ngOnInit(): void {

  }

  closeDialog(confirmation: boolean) {
    this.notify.emit(confirmation);

    this.isOpen = false;
  }
}
 