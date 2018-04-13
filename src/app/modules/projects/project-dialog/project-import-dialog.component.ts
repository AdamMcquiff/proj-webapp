import { Component, Input } from "@angular/core";

@Component({
  selector: "project-import-dialog",
  templateUrl: "./project-import-dialog.component.html"
})

export class ProjectImportDialogComponent {
  @Input() isOpen;

  dialogTitle = "Import a Project";
  dialogContext: Object = {
    title: "Importing data",
    body: "There is a host of project management-related tools on the market and it’s quite likely that you have data saved across a few of them. Instead of manually duplicating the data, Proj lets you import your data from a handful of popular tools."
  }
}
 