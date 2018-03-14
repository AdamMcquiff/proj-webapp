import { Component } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
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
  serverErrors = {};

  isToggled = {
    'title': false,
    'summary': false,
    'status': false,
    'due_date': false,
    'iteration': false,
  }

  constructor(private formBuilder: FormBuilder, private httpService: HttpService, private activatedRoute: ActivatedRoute) {}

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
