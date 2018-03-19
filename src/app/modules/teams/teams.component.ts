import { Component } from "@angular/core";

import { Team } from "./team.model";

import { HttpService } from "../../common/services/http.service";
import { APIResponse } from "../../common/interfaces/api-response.interface";

@Component({
  selector: "teams",
  templateUrl: "./teams.component.html"
})

export class TeamsComponent {
  teams: Array<Team>;
  selectedTeam: Team;

  isTeamInvitationDialogOpen: boolean;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.get('teams')
      .subscribe((data: APIResponse) => {
        this.teams = <Array<Team>>data.data;
        if (this.teams.length) this.selectedTeam = this.teams[0];
      });  
  }

  toggleTeamInvitationDialog() {
    this.isTeamInvitationDialogOpen = !this.isTeamInvitationDialogOpen;
  }

  changeTeam(team): void {
    this.selectedTeam = team;
  }
}
