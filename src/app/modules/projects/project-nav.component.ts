import { Component, Input } from "@angular/core";

@Component({
  selector: "project-nav",
  templateUrl: "./project-nav.component.html",
  providers: []
})

export class ProjectNavComponent {
  @Input() project;

  constructor() {}

  ngOnInit(): void {
    
  }
}
