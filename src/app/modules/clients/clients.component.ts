import { Component } from "@angular/core";

import { Client } from "./client.model";

import { HttpService } from "../../common/services/http.service";
import { APIResponse } from "../../common/interfaces/api-response.interface";

@Component({
  selector: "clients",
  templateUrl: "./clients.component.html"
})

export class ClientsComponent {
  clients: Array<Client>;
  
  isClientDialogOpen: boolean;
  isClientImportDialogOpen: boolean;

  constructor(
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.refreshData();
  }

  toggleCreateClientDialog() {
    this.isClientDialogOpen = !this.isClientDialogOpen;
  }

  toggleImportClientDialog() {
    this.isClientImportDialogOpen = !this.isClientImportDialogOpen;
  }

  refreshData() {
    this.httpService.get('clients')
      .subscribe((data: APIResponse) => this.clients = <Array<Client>>data.data);  
  }
}
