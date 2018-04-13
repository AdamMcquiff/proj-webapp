import { Component, Input } from "@angular/core";

@Component({
  selector: "iteration-import-dialog",
  templateUrl: "./iteration-import-dialog.component.html"
})

export class IterationImportDialogComponent {
  @Input() isOpen;

  dialogTitle = "Import an Iteration";
  dialogContext: Object = {
    title: "Importing data",
    body: "There is a host of project management-related tools on the market and it’s quite likely that you have data saved across a few of them. Instead of manually duplicating the data, Proj lets you import your data from a handful of popular tools."
  }
}
 