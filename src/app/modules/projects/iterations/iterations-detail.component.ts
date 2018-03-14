import { Component } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

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

  isTaskDialogOpen: boolean = false;

  constructor(private httpService: HttpService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      const projectId = params['id'];
      const iterationId = params['iterationId'];

      this.httpService.get('projects/' + projectId)
        .subscribe((data: APIResponse) => this.project = <Project>data.data)  

      this.httpService.get('iterations/' + iterationId)
        .subscribe((data: APIResponse) => this.iteration = <Iteration>data.data)  
    })
  }

  toggleCreateTaskDialog() {
    this.isTaskDialogOpen = !this.isTaskDialogOpen;
  }
}
