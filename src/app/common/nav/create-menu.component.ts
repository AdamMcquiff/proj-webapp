import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

import { Project } from "../../modules/projects/project.model";

import { APIResponse } from "../interfaces/api-response.interface";
import { HttpService } from "../services/http.service";

@Component({
  selector: "create-menu",
  templateUrl: "./create-menu.component.html",
})

export class CreateMenuComponent {
  @Input() isOpen;

  projects: Array<Project>;

  isTaskDialogOpen: boolean;
  isProjectDialogOpen: boolean;
  
  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.get('projects')
      .subscribe((data: APIResponse) => {
        this.projects = <Array<Project>>data.data;
      });  
  }

  toggleDialog() {
    this.isOpen = !this.isOpen;
  }

  toggleTaskDialog() {
    this.isTaskDialogOpen = !this.isTaskDialogOpen;
    this.isOpen = false;
  }

  toggleProjectDialog() {
    this.isProjectDialogOpen = !this.isProjectDialogOpen;
    this.isOpen = false;
  }
}
