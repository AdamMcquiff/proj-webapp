import { Component, Input } from "@angular/core";

import { Task } from "../../projects/tasks/task.model";

import { APIResponse } from "../../../common/interfaces/api-response.interface";
import { HttpService } from "../../../common/services/http.service";

@Component({
  selector: "dashboard-tasks-widget",
  templateUrl: "./tasks.widget.component.html"
})

export class TasksDashboardWidgetComponent {
  tasks: Array<Task>;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.get('tasks')
      .subscribe((data: APIResponse) => this.tasks = <Array<Task>>data.data);  
  }
}
  