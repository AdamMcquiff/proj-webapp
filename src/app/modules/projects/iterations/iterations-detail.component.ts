import { Component } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Project } from "../project.model";
import { Iteration } from "./iteration.model";

import { HttpService } from "../../../common/services/http.service";
import { APIResponse } from "../../../common/interfaces/api-response.interface";

import * as moment from 'moment'; 

@Component({
  selector: "iterations-detail",
  templateUrl: "./iterations-detail.component.html"
})

export class IterationsDetailComponent {
  project: Project;
  iteration: Iteration;

  iterationForm: FormGroup;
  
  serverErrors;

  deleteDialogTitle = 'Are you sure?';
  deleteDialogBody = {
    first_line: 'Are you sure you want to delete?',
    second_line: 'This action is permenant and cannot be undone.'
  };

  isToggled = {
    'title': false,
    'summary': false,
    'status': false,
    'start_date': false,
    'due_date': false,
  }

  isTaskDialogOpen: boolean;
  isTaskImportDialogOpen: boolean;
  isDeleting: boolean;
  isDeleteConfirmationDialogOpen: boolean;

  constructor(
    private formBuilder: FormBuilder, 
    private httpService: HttpService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.iterationForm = this.formBuilder.group({
      title:      ["", [ Validators.required ]],
      summary:    ["", [ Validators.required ]],
      status:     ["", [ Validators.required ]],
      start_date: ["", [ Validators.required ]],
      due_date:   ["", [ Validators.required ]],
    });

    this.activatedRoute.params.subscribe((params: Params) => {
      const projectId = params['id'];
      const iterationId = params['iterationId'];

      this.httpService.get('projects/' + projectId)
        .subscribe((data: APIResponse) => this.project = <Project>data.data)  

      this.httpService.get('iterations/' + iterationId)
        .subscribe((data: APIResponse) => this.iteration = this.format(<Iteration>data.data))  
    })
  }

  toggleField(field: string, isToggled: boolean) {
    this.isToggled[field] = isToggled;
    
    if (isToggled) return;

    this.httpService.put('iterations/' + this.iteration.id, this.parse(this.iteration))
      .subscribe(
        (data: APIResponse) => this.iteration = this.format(<Iteration> data.data),
        (error: Object) => this.serverErrors = error
      );  
  }

  toggleCreateTaskDialog() {
    this.isTaskDialogOpen = !this.isTaskDialogOpen;
  }

  toggleDeleteConfirmationDialog() {
    this.isDeleteConfirmationDialogOpen = !this.isDeleteConfirmationDialogOpen;
  }

  toggleImportTaskDialog() {
    this.isTaskImportDialogOpen = !this.isTaskImportDialogOpen;
  }

  onDeleteConfirmation(isPositiveConfirmation: boolean) {
    if (isPositiveConfirmation) this.deleteIteration();
  }

  deleteIteration() {
    this.isDeleting = true;
    
    this.httpService.delete('iterations/' + this.iteration.id)
      .subscribe(
        (data: APIResponse) => this.router.navigate(['/projects', this.project.id, 'iterations']),
        (error: Object) => this.serverErrors = error
      );  
  }

  private format (iteration: Iteration): Iteration {
    iteration.start_date = iteration.start_date 
      ? moment(iteration.start_date).format("DD/MM/YYYY") : iteration.start_date;

    iteration.due_date = iteration.due_date 
      ? moment(iteration.due_date).format("DD/MM/YYYY") : iteration.due_date;

    return iteration;
  }

  private parse (iteration: Iteration): Iteration {
    if (moment(iteration.start_date).format("YYYY-MM-DD") !== iteration.start_date)
      iteration.start_date = iteration.start_date 
        ? moment(iteration.start_date, "DD/MM/YYYY").format("YYYY-MM-DD") : iteration.start_date;

    if (moment(iteration.due_date).format("YYYY-MM-DD") !== iteration.due_date)
      iteration.due_date = iteration.due_date 
        ? moment(iteration.due_date, "DD/MM/YYYY").format("YYYY-MM-DD") : iteration.due_date;

    return iteration;
  }
}
