import { Component } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

import { HttpService } from "../../common/services/http.service";
import { APIResponse } from "../../common/interfaces/api-response.interface";
import { Project } from "../../common/models/project.model";

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
          this.project = data.data[0];

          // TODO: reformat dates
          // this.project.start_date = moment(this.project.start_date).format();
          // this.project.due_date = moment(this.project.due_date).format();
        })  
    });
  }
}
