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

  serverErrors;

  deleteDialog = {
    title: 'Are you sure?',
    body: {
      title: 'Are you sure you want to delete?',
      text: 'This action is permenant and cannot be undone.'
    },
    btn: {
      primary: 'Delete',
      secondary: 'No, don’t delete'
    }
  };

  isTeamInvitationDialogOpen: boolean;
  isDeleteConfirmationDialogOpen: boolean;

  constructor(
    private httpService: HttpService
  ) {}

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

  toggleDeleteConfirmationDialog() {
    this.isDeleteConfirmationDialogOpen = !this.isDeleteConfirmationDialogOpen;
  }

  onDeleteConfirmation(isPositiveConfirmation: boolean) {
    if (isPositiveConfirmation) this.deleteTeam();
  }

  deleteTeam(): void {
    this.httpService.delete('teams/' + this.selectedTeam.id)
      .subscribe(
        (data: APIResponse) => location.reload(),
        (error: Object) => this.serverErrors = error
      );
  }
}
