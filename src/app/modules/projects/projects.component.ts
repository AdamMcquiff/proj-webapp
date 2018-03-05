import { Component } from "@angular/core";
import { HttpService } from "../../common/services/http.service";
import { ProjectAPIResponse } from "./project-api-response.interface";

@Component({
  selector: "projects",
  templateUrl: "./projects.component.html",
  providers: []
})

export class ProjectsComponent {
  title = "Projects";

  projects: Object = null

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.get('projects')
      .subscribe((data: ProjectAPIResponse) => {
        this.projects = data.projects;
      });  
  }
}
