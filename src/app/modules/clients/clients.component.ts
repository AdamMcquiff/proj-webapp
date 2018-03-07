import { Component } from "@angular/core";

import { HttpService } from "../../common/services/http.service";
import { APIResponse } from "../../common/interfaces/api-response.interface";

@Component({
  selector: "clients",
  templateUrl: "./clients.component.html"
})

export class ClientsComponent {
  clients: Object;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.get('clients')
      .subscribe((data: APIResponse) => {
        this.clients = data.data;
      })  
  }
}
