import { Component } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

import { Project } from "../project.model";

import { HttpService } from "../../../common/services/http.service";
import { APIResponse } from "../../../common/interfaces/api-response.interface";

@Component({
  selector: "iterations",
  templateUrl: "./iterations.component.html"
})

export class IterationsComponent {
  project: Project;

  isIterationDialogOpen: boolean;
  isIterationImportDialogOpen: boolean;
  
  constructor(
    private httpService: HttpService, 
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      const projectId = params['id'];

      this.httpService.get('projects/' + projectId)
        .subscribe((data: APIResponse) => this.project = <Project>data.data)  
    })
  }

  toggleCreateIterationDialog() {
    this.isIterationDialogOpen = !this.isIterationDialogOpen;
  }

  toggleImportIterationDialog() {
    this.isIterationImportDialogOpen = !this.isIterationImportDialogOpen;
  }
}
