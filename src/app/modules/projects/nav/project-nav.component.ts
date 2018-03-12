import { Component, Input } from "@angular/core";

@Component({
  selector: "project-nav",
  templateUrl: "./project-nav.component.html",
})

export class ProjectNavComponent {
  @Input() project;
}
