import { Component, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { Project } from "../project.model";

import { HttpService } from "../../../common/services/http.service";
import { APIResponse } from "../../../common/interfaces/api-response.interface";

@Component({
  selector: "project-people-dialog",
  templateUrl: "./project-people-dialog.component.html"
})

export class ProjectPeopleDialogComponent {
  @Input() isOpen;
  @Input() project: Project;

  invite: Object;

  projectPeopleForm: FormGroup;

  isPerformingAPICall: boolean;

  serverErrors;

  title: string;
  context: Object = {
    title: "Invitation",
    body: "You can invite anyone who has an account with Proj to a project. They will be able to make changes and view all project data, but they will not join any teams nor the organisation that the project belongs to."
  };

  constructor(
    private formBuilder: FormBuilder, 
    private httpService: HttpService, 
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.projectPeopleForm = this.formBuilder.group({
      email: ["", [ 
        Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")
       ]],
      role:  ["", [ Validators.required ]]
    });

    this.title = "Invite people to " + this.project.title;
  }

  public onFormSubmit() {
    if (!this.projectPeopleForm.valid) return;

    this.invite = this.projectPeopleForm.value;

    this.isPerformingAPICall = true;

    this.httpService.post('projects/' + this.project.id + '/invite', this.invite)
      .subscribe(
        (data: APIResponse) => this.isOpen = false,
        error => this.serverErrors = error,
        () => this.isPerformingAPICall = false
      );  
  }

  get email() { 
    return this.projectPeopleForm.get('email'); 
  }

  get role() { 
    return this.projectPeopleForm.get('role'); 
  }
}
 