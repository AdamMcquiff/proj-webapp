import { Component, Input } from "@angular/core";
import { HttpService } from "../../../../common/services/http.service";
import { ProjectAPIResponse } from "../../../projects/project-api-response.interface";

@Component({
  selector: "dashboard-projects-widget",
  templateUrl: "./projects.widget.component.html",
  providers: []
})

export class ProjectsDashboardWidgetComponent {
  projects: Object = null

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.get('projects')
      .subscribe((data: ProjectAPIResponse) => {
        this.projects = data.projects;
      });  
  }
}
 