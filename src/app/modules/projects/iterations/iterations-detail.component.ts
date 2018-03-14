import { Component } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
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
  serverErrors = {};

  isToggled = {
    'title': false,
    'summary': false,
    'status': false,
    'start_date': false,
    'due_date': false,
  }

  isTaskDialogOpen: boolean = false;

  constructor(private formBuilder: FormBuilder, private httpService: HttpService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.iterationForm = this.formBuilder.group({
      title: ["", [ Validators.required ]],
      summary: ["", [ Validators.required ]],
      status: ["", [ Validators.required ]],
      start_date: ["", [ Validators.required ]],
      due_date: ["", [ Validators.required ]],
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
