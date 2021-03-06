import { Component } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { Project } from "../project.model";
import { Task } from "./task.model";

import { HttpService } from "../../../common/services/http.service";
import { APIResponse } from "../../../common/interfaces/api-response.interface";

import * as moment from 'moment'; 

@Component({
  selector: "tasks-detail",
  templateUrl: "./tasks-detail.component.html"
})

export class TasksDetailComponent {
  project: Project;
  task: Task;

  taskForm: FormGroup;
  
  serverErrors;
  
  deleteDialog = {
    title: 'Are you sure?',
    body: {
      title: 'Are you sure you want to delete?',
      text: 'This action is permenant and cannot be undone.'
    },
    btn: {
      primary: 'Delete',
      secondary: 'No, don’t delete'
    }
  };

  isDeleting: boolean;
  isDeleteConfirmationDialogOpen: boolean;

  isToggled = {
    'title': false,
    'summary': false,
    'status': false,
    'due_date': false,
    'iteration': false,
  }

  constructor(private formBuilder: FormBuilder, private httpService: HttpService, private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      title:     ["", [ Validators.required ]],
      summary:   ["", [ Validators.required ]], 
      status:    ["", [ Validators.required ]],  
      due_date:  ["", [ Validators.required ]],  
      iteration: ["", [ Validators.required ]], 
    });

    
    this.activatedRoute.params.subscribe((params: Params) => {
      const projectId = params['id'];
      const taskId = params['taskId'];

      this.httpService.get('projects/' + projectId)
        .subscribe((data: APIResponse) => this.project = <Project>data.data)  

      this.httpService.get('tasks/' + taskId)
        .subscribe((data: APIResponse) => this.task = this.format(<Task>data.data))  
    })
  }

  toggleField(field: string, isToggled: boolean) {
    this.isToggled[field] = isToggled;
    
    if (isToggled) return;

    this.httpService.put('tasks/' + this.task.id, this.parse(this.task))
      .subscribe(
        (data: APIResponse) => this.task = this.format(<Task> data.data),
        (error: Object) => this.serverErrors = error
      );  
  }
  
  toggleDeleteConfirmationDialog() {
    this.isDeleteConfirmationDialogOpen = !this.isDeleteConfirmationDialogOpen;
  }

  onDeleteConfirmation(isPositiveConfirmation: boolean) {
    if (isPositiveConfirmation) this.deleteTask();
  }

  deleteTask() {
    this.isDeleting = true;

    this.httpService.delete('tasks/' + this.task.id)
      .subscribe(
        (data: APIResponse) => this.router.navigate(['/projects', this.project.id, 'tasks']),
        (error: Object) => this.serverErrors = error
      );  
  }

  private format(task: Task): Task {
    task.due_date = task.due_date 
      ? moment(task.due_date).format("DD/MM/YYYY") : task.due_date;

    return task;
  }

  private parse(task: Task): Task {
    if (moment(task.due_date).format("YYYY-MM-DD") !== task.due_date)
      task.due_date = task.due_date 
        ? moment(task.due_date, "DD/MM/YYYY").format("YYYY-MM-DD") : task.due_date;
    
    task.iteration_id = task.iteration 
      ? task.iteration.id : null;

    return task;
  }
}
