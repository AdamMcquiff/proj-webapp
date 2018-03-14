import { Component } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
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

  isToggled = {
    summary: false,
    status: false,
    client: false,
    methodology: false,
    budget: false,
    start_date: false,
    due_date: false,
  }

  isIterationDialogOpen: boolean = false;

  constructor(private formBuilder: FormBuilder, private httpService: HttpService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
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

  // TODO: refactor
  toggleField(field: string, isToggled: boolean) {
    if (field == 'summary') this.isToggled.summary = isToggled;
    if (field == 'client') this.isToggled.client = isToggled;
    if (field == 'status') this.isToggled.status = isToggled;
    if (field == 'methodology') this.isToggled.methodology = isToggled;
    if (field == 'budget') this.isToggled.budget = isToggled;
    if (field == 'start_date') this.isToggled.start_date = isToggled;
    if (field == 'due_date') this.isToggled.due_date = isToggled;

    if (!isToggled) {
      this.httpService.put('projects/' + this.project.id, this.parse(this.project))
        .subscribe(
          (data: APIResponse) => this.project = this.format(<Project> data.data),
          (error: Object) => this.serverErrors = error
        );  
    }
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