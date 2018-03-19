import { Component, Input } from "@angular/core";

import { Project } from "../../projects/project.model";

import { APIResponse } from "../../../common/interfaces/api-response.interface";
import { HttpService } from "../../../common/services/http.service";

@Component({
  selector: "dashboard-projects-widget",
  templateUrl: "./projects.widget.component.html"
})

export class ProjectsDashboardWidgetComponent {
  projects: Array<Project>;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.get('projects')
      .subscribe((data: APIResponse) => {
        this.projects = <Array<Project>>data.data;
      });  
  }
}
 