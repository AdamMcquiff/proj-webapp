import { Component, Input, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { APIResponse } from "../../../common/interfaces/api-response.interface";
import { HttpService } from "../../../common/services/http.service";

@Component({
  selector: "welcome-dialog",
  templateUrl: "./welcome-dialog.component.html"
})

export class WelcomeDialogComponent {
  @Input() isOpen;
  @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  organisation: Object;

  serverErrors;

  welcomeForm: FormGroup;

  constructor(private httpService: HttpService, private formBuilder: FormBuilder) {}
  
  ngOnInit(): void {
    this.welcomeForm = this.formBuilder.group({
      name: ["", [
        Validators.required
      ]]
    });
  }
  
  onFormSubmit() {
    if (!this.welcomeForm.valid) return;
  
    this.organisation = this.welcomeForm.value;

    this.httpService.post('organisations', this.organisation)
      .subscribe(
        (data: APIResponse) => this.closeDialog(true),
        error => this.serverErrors = error
      ); 
  }

  closeDialog(isOrganisationSetup: boolean) {
    this.notify.emit(isOrganisationSetup);
    this.isOpen = false;
  }

  get name() { 
    return this.welcomeForm.get('name'); 
  }
}
 