import { Component, Output, EventEmitter } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Project } from "./project.model";

import { HttpService } from "../../common/services/http.service";
import { APIResponse } from "../../common/interfaces/api-response.interface";

import * as moment from 'moment'; 

@Component({
  selector: "projects",
  templateUrl: "./projects-detail.component.html"
})

export class ProjectsDetailComponent {
  project: Project;
  clients;

  projectForm: FormGroup;
  serverErrors = {};

  deleteDialogTitle = 'Are you sure?';
  deleteDialogBody = {
    first_line: 'Are you sure you want to delete?',
    second_line: 'This action is permenant and cannot be undone.'
  };

  isToggled = {
    'title': false,
    'summary': false,
    'status': false,
    'client': false,
    'methodology': false,
    'budget': false,
    'start_date': false,
    'due_date': false,
  };

  isIterationDialogOpen: boolean;
  isProjectPeopleDialogOpen: boolean;
  isDeleting: boolean;
  isDeleteConfirmationDialogOpen: boolean;

  constructor(
    private formBuilder: FormBuilder, 
    private httpService: HttpService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      title:       ["", [ Validators.required ]],
      summary:     ["", [ Validators.required ]],
      client:      ["", [ Validators.required ]],
      status:      ["", [ Validators.required ]],
      methodology: ["", [ Validators.required ]], 
      budget:      ["", [ Validators.required ]],  
      start_date:  ["", [ Validators.required ]],  
      due_date:    ["", [ Validators.required ]], 
    });

    this.activatedRoute.params.subscribe((params: Params) => {
      const projectId = params['id'];

      this.httpService.get('projects/' + projectId)
        .subscribe((data: APIResponse) => this.project = this.format(<Project>data.data))  

      this.httpService.get('clients')
        .subscribe((data: APIResponse) => this.clients = data.data)  
    })
  }
  
  toggleCreateIterationDialog() {
    this.isIterationDialogOpen = !this.isIterationDialogOpen;
  }

  toggleProjectPeopleDialog() {
    this.isProjectPeopleDialogOpen = !this.isProjectPeopleDialogOpen;
  }

  toggleField(field: string, isToggled: boolean) {
    this.isToggled[field] = isToggled;
    
    if (isToggled) return;

    this.httpService.put('projects/' + this.project.id, this.parse(this.project))
      .subscribe(
        (data: APIResponse) => this.project = this.format(<Project> data.data),
        (error: Object) => this.serverErrors = error
      )
  }

  setProjectArchiveState(isArchived: boolean) {
    this.httpService.post('projects/' + this.project.id + '/archive', { 'archive': isArchived })
      .subscribe(
        (data: APIResponse) => this.router.navigate(['/projects']),
        (error: Object) => this.serverErrors = error
      )
  }

  toggleDeleteConfirmationDialog() {
    this.isDeleteConfirmationDialogOpen = !this.isDeleteConfirmationDialogOpen;
  }

  onDeleteConfirmation(isPositiveConfirmation: boolean) {
    if (isPositiveConfirmation) this.deleteProject();
  }

  deleteProject() {
    this.isDeleting = true;
    
    this.httpService.delete('projects/' + this.project.id)
      .subscribe(
        (data: APIResponse) => this.router.navigate(['/projects']),
        (error: Object) => this.serverErrors = error
      )
  }

  private format(project: Project): Project {       
    project.start_date = project.start_date 
      ? moment(project.start_date).format("DD/MM/YYYY") : project.start_date;
    project.due_date = project.due_date 
      ? moment(project.due_date).format("DD/MM/YYYY") : project.due_date;
    project.budget = project.budget 
      ? parseFloat(project.budget.toString()) : project.budget;
    project.client = project.client ? project.client : { id: null, name: '--' };

    return project;
  }

  private parse (project): object {
    project.start_date = project.start_date 
      ? moment(project.start_date, "DD/MM/YYYY").format("YYYY-MM-DD") : project.start_date;
    project.due_date = project.due_date 
      ? moment(project.due_date, "DD/MM/YYYY").format("YYYY-MM-DD") : project.due_date;
    project.client_id = project.client 
      ? project.client.id : null;
    project.users = project.users.map(user => user.id);

    return project;
  }
}