import { Component } from "@angular/core";

import { User } from "../authentication/user.model";

import { HttpService } from "../../common/services/http.service";
import { APIResponse } from "../../common/interfaces/api-response.interface";

@Component({
  selector: "dashboard",
  templateUrl: "./dashboard.component.html"
})

export class DashboardComponent {
  user: User;

  isWelcomeDialogOpen: boolean;
  
  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.get('profile')
      .subscribe((data: APIResponse) => {
        this.user = <User>data.data;
        
        if (this.user.first_login) 
          this.toggleWelcomeDialog();
      })
  }

  toggleWelcomeDialog() {
    this.isWelcomeDialogOpen = !this.isWelcomeDialogOpen;
  }

  onWelcomeDialogComplete(isOrganisationSetup: boolean) {
    if (!isOrganisationSetup) return;

    this.httpService.post('profile', { 'first_login': 0 })
      .subscribe((data: APIResponse) => {
        this.user = <User>data.data;
        window.location.reload();
      })
  }
}
