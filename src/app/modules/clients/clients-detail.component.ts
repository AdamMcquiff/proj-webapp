import { Component } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { Client } from "./client.model";

import { HttpService } from "../../common/services/http.service";
import { APIResponse } from "../../common/interfaces/api-response.interface";

@Component({
  selector: "clients-detail",
  templateUrl: "./clients-detail.component.html"
})

export class ClientsDetailComponent {
  client: Client;

  clientForm: FormGroup;
  serverErrors = {};

  isToggled = {
    'name': false,
    'summary': false
  };

  constructor(
    private formBuilder: FormBuilder, 
    private httpService: HttpService, 
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.clientForm = this.formBuilder.group({
      name:    ["", [ Validators.required ]],
      summary: ["", [ Validators.required ]],
    });

    this.activatedRoute.params.subscribe((params: Params) => {
      const clientId = params['id'];

      this.httpService.get('clients/' + clientId)
        .subscribe((data: APIResponse) => {
          this.client = <Client>data.data;
        });
    }); 
  }

  toggleField(field: string, isToggled: boolean) {
    this.isToggled[field] = isToggled;
    
    if (isToggled) return;

    this.httpService.put('clients/' + this.client.id, this.client)
      .subscribe(
        (data: APIResponse) => this.client = <Client>data.data,
        (error: Object) => this.serverErrors = error
      )
  }
}
    
