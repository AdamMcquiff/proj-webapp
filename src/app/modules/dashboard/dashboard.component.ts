import { Component } from "@angular/core";
import { HttpService } from "../../common/services/http.service";
import { APIResponse } from "../../common/interfaces/api-response.interface";

import { User } from "../../common/models/user.model";

@Component({
  selector: "dashboard",
  templateUrl: "./dashboard.component.html",
  providers: []
})

export class DashboardComponent {
  title = "Dashboard";

  user = {};

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.get('profile')
      .subscribe((data: APIResponse) => {
        this.user = data.data
      });  
  }
}
