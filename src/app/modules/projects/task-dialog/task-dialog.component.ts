import { Component, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { Task } from "../tasks/task.model";
import { Project } from "../project.model";

import { HttpService } from "../../../common/services/http.service";
import { APIResponse } from "../../../common/interfaces/api-response.interface";

@Component({
  selector: "task-dialog",
  templateUrl: "./task-dialog.component.html"
})

export class TaskDialogComponent {
  @Input() isOpen;
  @Input() projects;
  @Input() iterations;
  @Input() selectedIteration;

  selectedProject: Project;
  task: Task;

  taskForm: FormGroup;
  
  serverErrors;

  isPerformingAPICall: boolean;
  
  dialogTitle = "Create a new task";
  dialogContext: Object = {
    title: "New Task",
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
           Vestibulum vitae sollicitudin sapien. Morbi a nisi vulputate, congue nisl vitae, posuere ex. 
           Maecenas sollicitudin elit turpis, at condimentum felis varius malesuada.`
  };

  constructor(private formBuilder: FormBuilder, private httpService: HttpService, private router: Router) {}
  
  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      title: ["", [ Validators.required ]],
      selectedProject: ["", []],
      iteration_id: ["", [ Validators.required ]] 
    });
  }

  onFormSubmit() {
    if (!this.taskForm.valid) return;

    this.task = this.taskForm.value;

    this.isPerformingAPICall = true;

    let iteration_id = this.iterations ? this.iterations[0].project_id : this.selectedProject.id;

    this.httpService.post('tasks', Object.assign({ iteration_id: this.task.iteration_id }, this.task))
      .subscribe(
        (data: APIResponse) => {
          this.task = <Task> data.data;
          this.router.navigate(['/projects', iteration_id, 'tasks', this.task.id]);
          this.isOpen = false;
        },
        error => this.serverErrors = error,
        () => this.isPerformingAPICall = false
      );  
  }

  changeProject(project: Project) {
    this.selectedProject = <Project>project;
  }

  get title() { 
    return this.taskForm.get('title'); 
  }
}
 