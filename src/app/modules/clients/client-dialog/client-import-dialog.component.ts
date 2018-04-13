import { Component, Input } from "@angular/core";

@Component({
  selector: "client-import-dialog",
  templateUrl: "./client-import-dialog.component.html"
})

export class ClientImportDialogComponent {
  @Input() isOpen;

  dialogTitle = "Import a Client";
  dialogContext: Object = {
    title: "Importing data",
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
           Vestibulum vitae sollicitudin sapien. Morbi a nisi vulputate, congue nisl vitae, posuere ex. 
           Maecenas sollicitudin elit turpis, at condimentum felis varius malesuada.`
  }
}
 