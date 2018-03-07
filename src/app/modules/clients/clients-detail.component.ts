import { Component } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

import { HttpService } from "../../common/services/http.service";
import { APIResponse } from "../../common/interfaces/api-response.interface";

@Component({
  selector: "clients-detail",
  templateUrl: "./clients-detail.component.html"
})

export class ClientsDetailComponent {
  client: Object;

  constructor(private httpService: HttpService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      const clientId = params['id'];

      this.httpService.get('clients/' + clientId)
        .subscribe((data: APIResponse) => {
          this.client = data.data[0];
        })  
    }); 
  }
}
    
