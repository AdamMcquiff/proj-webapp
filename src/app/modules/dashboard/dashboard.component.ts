import { Component } from "@angular/core";

import { HttpService } from "../../common/services/http.service";
import { APIResponse } from "../../common/interfaces/api-response.interface";

@Component({
  selector: "dashboard",
  templateUrl: "./dashboard.component.html"
})

export class DashboardComponent {
  user: Object = {};
  isToastOpen: boolean = false;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.get('profile')
      .subscribe((data: APIResponse) => {
        this.user = data.data
      });  
  }
}
