import { Component } from "@angular/core";
import { HttpService } from "../../common/services/http.service";
import { ActivatedRoute, Params } from "@angular/router";
import { Project } from "../../common/models/project.model";
import { APIResponse } from "../../common/interfaces/api-response.interface";

@Component({
  selector: "iterations",
  templateUrl: "./iterations.component.html",
  providers: []
})

export class IterationsComponent {
  project: Project;

  constructor(private httpService: HttpService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      const projectId = params['id'];

      this.httpService.get('projects/' + projectId)
        .subscribe((data: APIResponse) => {
          this.project = data.data[0];
        })  
    });
  }
}
