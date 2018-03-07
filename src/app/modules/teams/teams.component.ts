import { Component } from "@angular/core";

import { HttpService } from "../../common/services/http.service";
import { APIResponse } from "../../common/interfaces/api-response.interface";

@Component({
  selector: "teams",
  templateUrl: "./teams.component.html"
})

export class TeamsComponent {
  teams: Object = null;
  selectedTeam: Object = null;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.get('teams')
      .subscribe((data: APIResponse) => {
        this.teams = data.data;
        if (this.teams) this.selectedTeam = this.teams[0];
      });  
  }

  changeTeam(team): void {
    this.selectedTeam = team;
  }
}
