import { Component } from "@angular/core";

import { Project } from "./project.model";

import { HttpService } from "../../common/services/http.service";
import { APIResponse } from "../../common/interfaces/api-response.interface";

@Component({
  selector: "projects",
  templateUrl: "./projects.component.html"
})

export class ProjectsComponent {
  projects: Array<Project>;

  filters = {
    'active': { state: true, title: 'Active' },
    'archived': { state: false, title: 'Archived' },
    'all': { state: false, title: 'All' },
  }

  isProjectDialogOpen: boolean;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.get('projects')
      .subscribe((data: APIResponse) => this.projects = <Array<Project>>data.data)
  }

  toggleCreateProjectDialog() {
    this.isProjectDialogOpen = !this.isProjectDialogOpen;
  }

  getTitle() {
    if (this.filters['active'].state) return "Active Projects";
    if (this.filters['archived'].state) return "Archived Projects";
    if (this.filters['all'].state) return "All Projects";
  }
 
  setFilter(filter: string) {
    Object.keys(this.filters).map(key => this.filters[key].state = false);
    this.filters[filter].state = true;
  }

  isFiltered(project: Project) {
    if (this.filters['active'].state) return project.archived;
    if (this.filters['archived'].state) return !project.archived;
    if (this.filters['all'].state) return false;
  }
}  
