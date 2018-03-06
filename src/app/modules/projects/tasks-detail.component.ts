import { Component } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

import { HttpService } from "../../common/services/http.service";
import { Project } from "../../common/models/project.model";
import { APIResponse } from "../../common/interfaces/api-response.interface";

import * as moment from 'moment'; 

@Component({
  selector: "tasks-detail",
  templateUrl: "./tasks-detail.component.html",
  providers: []
})

export class TasksDetailComponent {
  project: Project;
  task: Object;

  constructor(private httpService: HttpService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      const projectId = params['id'];
      const taskId = params['taskId'];

      this.httpService.get('projects/' + projectId)
        .subscribe((data: APIResponse) => {
          this.project = data.data[0];
        })  

      this.httpService.get('tasks/' + taskId)
        .subscribe((data: APIResponse) => {
          this.task = data.data[0];
        })  
    });
  }
}
