import { Component } from "@angular/core";
import { HttpService } from "../../common/services/http.service";
import { ActivatedRoute, Params } from "@angular/router";
import { APIResponse } from "../../common/interfaces/api-response.interface";

@Component({
  selector: "projects",
  templateUrl: "./projects-detail.component.html",
  providers: []
})

export class ProjectsDetailComponent {
  title = "Projects";

  projectId = null;
  project: Object = null;
  itertations: Object = null;

  constructor(private httpService: HttpService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.projectId = params['id'];

      this.httpService.get('projects/' + this.projectId)
        .subscribe((data: APIResponse) => {
          console.log(data)
          this.project = data.data[0];
          this.httpService.get
        })  
    });
  }
}
