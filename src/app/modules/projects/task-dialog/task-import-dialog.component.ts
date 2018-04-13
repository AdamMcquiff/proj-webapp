import { Component, Input } from "@angular/core";

@Component({
  selector: "task-import-dialog",
  templateUrl: "./task-import-dialog.component.html"
})

export class TaskImportDialogComponent {
  @Input() isOpen;

  dialogTitle = "Import a Task";
  dialogContext: Object = {
    title: "Importing data",
    body: "There is a host of project management-related tools on the market and it’s quite likely that you have data saved across a few of them. Instead of manually duplicating the data, Proj lets you import your data from a handful of popular tools."
  }
}
 