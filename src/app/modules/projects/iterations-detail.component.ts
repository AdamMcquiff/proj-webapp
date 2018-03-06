import { Component } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

import { HttpService } from "../../common/services/http.service";
import { Project } from "../../common/models/project.model";
import { APIResponse } from "../../common/interfaces/api-response.interface";

import * as moment from 'moment'; 

@Component({
  selector: "iterations-detail",
  templateUrl: "./iterations-detail.component.html",
  providers: []
})

export class IterationsDetailComponent {
  project: Project;
  iteration: Object;

  constructor(private httpService: HttpService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      const projectId = params['id'];
      const iterationId = params['iterationId'];

      this.httpService.get('projects/' + projectId)
        .subscribe((data: APIResponse) => {
          this.project = data.data[0];
        })  

      this.httpService.get('iterations/' + iterationId)
        .subscribe((data: APIResponse) => {
          this.iteration = data.data[0];
        })  
    });
  }
}
