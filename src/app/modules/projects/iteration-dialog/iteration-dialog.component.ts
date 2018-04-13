import { Component, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { Iteration } from "../iterations/iteration.model";

import { HttpService } from "../../../common/services/http.service";
import { APIResponse } from "../../../common/interfaces/api-response.interface";

@Component({
  selector: "iteration-dialog",
  templateUrl: "./iteration-dialog.component.html"
})

export class IterationDialogComponent {
  @Input() isOpen;
  @Input() projectId;

  iterationForm: FormGroup;
  
  serverErrors;

  isPerformingAPICall: boolean;
  
  iteration: Iteration;
  
  dialogTitle = "Create a new iteration";
  dialogContext: Object = {
    title: "New Iteration",
    body: "Iterations - which are also contextually referred to as sprints or phases - are collections of tasks with a specific timeframe. Generally, an iteration will focus on a specific area of the project. An iteration must be associated with a project."
  };

  constructor(
    private formBuilder: FormBuilder, 
    private httpService: HttpService, 
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.iterationForm = this.formBuilder.group({
      title: ["", [ Validators.required ]] 
    });
  }

  onFormSubmit() {
    if (!this.iterationForm.valid) return;

    this.iteration = this.iterationForm.value;

    this.isPerformingAPICall = true;

    this.httpService.post('iterations', Object.assign({ project_id: this.projectId }, this.iteration))
      .subscribe(
        (data: APIResponse) => {
          this.iteration = <Iteration>data.data;
          this.router.navigate(['/projects', this.projectId, 'iterations', this.iteration.id]);
          this.isOpen = false;
        },
        error => this.serverErrors = error,
        () => this.isPerformingAPICall = false
      )
  }

  get title() { 
    return this.iterationForm.get('title'); 
  }
}
 