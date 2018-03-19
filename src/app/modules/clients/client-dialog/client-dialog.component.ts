import { Component, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { Client } from "../client.model";

import { HttpService } from "../../../common/services/http.service";
import { APIResponse } from "../../../common/interfaces/api-response.interface";

@Component({
  selector: "client-dialog",
  templateUrl: "./client-dialog.component.html"
})
export class ClientDialogComponent {
  @Input() isOpen;
  
  clientForm: FormGroup;

  client: Client;

  isPerformingAPICall: boolean;

  serverErrors;

  dialogTitle = 'Create a new client';
  dialogContext: Object = {
    title: 'New Client',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
           Vestibulum vitae sollicitudin sapien. Morbi a nisi vulputate, congue nisl vitae, posuere ex. 
           Maecenas sollicitudin elit turpis, at condimentum felis varius malesuada.`
  };

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clientForm = this.formBuilder.group({
      name: ["", [Validators.required]]
    });
  }

  public onFormSubmit() {
    if (!this.clientForm.valid) return;

    this.client = this.clientForm.value;

    this.isPerformingAPICall = true;

    this.httpService.post("clients", this.client).subscribe(
      (data: APIResponse) => {
        this.client = <Client>data.data;
        this.router.navigate(["/clients", this.client.id]);
        this.isOpen = false;
      },
      error => (this.serverErrors = error),
      () => (this.isPerformingAPICall = false)
    );
  }

  get name() {
    return this.clientForm.get("name");
  }
}
