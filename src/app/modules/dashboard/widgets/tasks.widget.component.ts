import { Component, Input } from "@angular/core";
import { User } from "../../../common/models/user.model";
import { HttpService } from "../../../common/services/http.service";
import { TaskAPIResponse } from "../../tasks/task-api-response.interface";

@Component({
  selector: "dashboard-tasks-widget",
  templateUrl: "./tasks.widget.component.html",
  providers: []
})

export class TasksDashboardWidgetComponent {
  tasks: Object = null

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {

    this.httpService.get('tasks')
      .subscribe((data: TaskAPIResponse) => {
        this.tasks = data.tasks;
        console.log(this.tasks)
      });  
  }
}
 