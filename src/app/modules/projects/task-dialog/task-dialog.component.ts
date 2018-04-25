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
  
  formErrors;
  serverErrors;

  isPerformingAPICall: boolean;
  
  dialogTitle = "Create a new task";
  dialogContext: Object = {
    title: "New Task",
    body: "Tasks - which are also contextually referred to as issues or stories - are the specific aspects of a project; the literal tasks that need to be complete. Tasks can have dates, statuses and can be associated with anyone on the project. Tasks must be associated with an iteration."
  };

  constructor(
    private formBuilder: FormBuilder, 
    private httpService: HttpService, 
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      title:            ["", [ Validators.required ]],
      selected_project: [null, []],
      iteration_id:     [null, [ Validators.required ]]
    });
  }

  onFormSubmit() {
    console.log(this.taskForm)
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

  get iteration_id() { 
    return this.taskForm.get('iteration_id'); 
  }
}
 