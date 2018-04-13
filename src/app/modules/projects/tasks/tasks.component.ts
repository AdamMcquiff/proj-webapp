import { Component } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

import { Project } from "../project.model";
import { Iteration } from "../iterations/iteration.model";
import { Task } from "./task.model";

import { HttpService } from "../../../common/services/http.service";
import { APIResponse } from "../../../common/interfaces/api-response.interface";

@Component({
  selector: "tasks",
  templateUrl: "./tasks.component.html"
})

export class TasksComponent {
  project: Project;
  tasks: Array<Task>;

  isTaskDialogOpen: boolean;
  isTaskImportDialogOpen: boolean;

  constructor(
    private httpService: HttpService, 
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      const projectId = params['id'];

      this.httpService.get('projects/' + projectId)
        .subscribe((data: APIResponse) => { 
          this.project = <Project>data.data;

          this.tasks = [];
         
          this.project.iterations.forEach((iteration: Iteration) => {
            iteration.tasks.forEach((task: Task) => this.tasks.push(task))
          })
        }) 
    })
  }

  toggleCreateTaskDialog() {
    this.isTaskDialogOpen = !this.isTaskDialogOpen;
  }

  toggleImportTaskDialog() {
    this.isTaskImportDialogOpen = !this.isTaskImportDialogOpen;
  }
}
