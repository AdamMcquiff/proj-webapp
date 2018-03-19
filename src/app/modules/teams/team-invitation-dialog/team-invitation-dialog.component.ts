import { Component, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { Team } from "../team.model";

import { HttpService } from "../../../common/services/http.service";
import { APIResponse } from "../../../common/interfaces/api-response.interface";

@Component({
  selector: "team-invitation-dialog",
  templateUrl: "./team-invitation-dialog.component.html"
})

export class TeamInvitationDialogComponent {
  @Input() isOpen;
  @Input() team: Team;

  invite: Object;

  teamInvitationForm: FormGroup;

  isPerformingAPICall: boolean;

  serverErrors;

  title = '';
  context: Object = {
    title: 'Invitation',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
           Vestibulum vitae sollicitudin sapien. Morbi a nisi vulputate, congue nisl vitae, posuere ex. 
           Maecenas sollicitudin elit turpis, at condimentum felis varius malesuada.`
  };

  constructor(
    private formBuilder: FormBuilder, 
    private httpService: HttpService, 
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.teamInvitationForm = this.formBuilder.group({
      email: ["", [ 
        Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")
       ]],
      role:  ["", [ Validators.required ]]
    });

    this.title = 'Invite a user to ' + this.team.name;
  }

  public onFormSubmit() {
    if (!this.teamInvitationForm.valid) return;

    this.invite = this.teamInvitationForm.value;

    this.isPerformingAPICall = true;

    this.httpService.post('teams/' + this.team.id + '/invite', this.invite)
      .subscribe(
        (data: APIResponse) => this.isOpen = false,
        error => this.serverErrors = error,
        () => this.isPerformingAPICall = false
      );  
  }

  get email() { 
    return this.teamInvitationForm.get('email'); 
  }

  get role() { 
    return this.teamInvitationForm.get('role'); 
  }
}
 