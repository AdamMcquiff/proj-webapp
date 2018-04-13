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
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
           Vestibulum vitae sollicitudin sapien. Morbi a nisi vulputate, congue nisl vitae, posuere ex. 
           Maecenas sollicitudin elit turpis, at condimentum felis varius malesuada.`
  }
}
 