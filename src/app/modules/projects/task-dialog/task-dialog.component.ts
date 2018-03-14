import { Component, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { Task } from "../tasks/task.model";

import { HttpService } from "../../../common/services/http.service";
import { APIResponse } from "../../../common/interfaces/api-response.interface";

@Component({
  selector: "task-dialog",
  templateUrl: "./task-dialog.component.html"
})

export class TaskDialogComponent {
  @Input() isOpen;
  @Input() iterations;

  taskForm: FormGroup;
  serverErrors = {};
  isPerformingAPICall: boolean = false;
  
  task: Task;
  
  title = "Create a new task";
  context: Object = {
    title: "New Task",
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
           Vestibulum vitae sollicitudin sapien. Morbi a nisi vulputate, congue nisl vitae, posuere ex. 
           Maecenas sollicitudin elit turpis, at condimentum felis varius malesuada.`
  };

  constructor(private formBuilder: FormBuilder, private httpService: HttpService, private router: Router) {}
  
  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      title: ["", [ Validators.required ]],
      iteration_id: ["", [ Validators.required ]] 
    });
  }

  onFormSubmit() {
    if (!this.taskForm.valid) return;

    this.task = this.taskForm.value;

    this.isPerformingAPICall = true;

    this.httpService.post('tasks', Object.assign({ iteration_id: this.task.iteration_id }, this.task))
      .subscribe(
        (data: APIResponse) => {
          this.task = <Task> data.data;
          this.router.navigate(['/projects', this.iterations[0].project_id, 'tasks', this.task.id]);
        },
        error => this.serverErrors = error,
        () => this.isPerformingAPICall = false
      );  
  }
}
 