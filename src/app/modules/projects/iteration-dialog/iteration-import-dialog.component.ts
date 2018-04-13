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
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
           Vestibulum vitae sollicitudin sapien. Morbi a nisi vulputate, congue nisl vitae, posuere ex. 
           Maecenas sollicitudin elit turpis, at condimentum felis varius malesuada.`
  }
}
 