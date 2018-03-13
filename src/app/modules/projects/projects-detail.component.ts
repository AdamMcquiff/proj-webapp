import { Component } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

import { Project } from "./project.model";

import { HttpService } from "../../common/services/http.service";
import { APIResponse } from "../../common/interfaces/api-response.interface";

import * as moment from 'moment'; 

@Component({
  selector: "projects",
  templateUrl: "./projects-detail.component.html",
  providers: []
})

export class ProjectsDetailComponent {
  project: Project;

  constructor(private httpService: HttpService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      const projectId = params['id'];

      this.httpService.get('projects/' + projectId)
        .subscribe((data: APIResponse) => {
          this.project = this.format(<Project>data.data);
        })  
    });
  }

  private format(project: Project): Project {      
    if (project.start_date) 
      project.start_date = moment(project.start_date).format("DD/MM/YYYY");
    if (project.due_date) 
      project.due_date = moment(project.due_date).format("DD/MM/YYYY");

    return project;
  }
}
