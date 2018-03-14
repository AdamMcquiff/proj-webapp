import { Iteration } from "../iterations/iteration.model";

export class Task {
  id: number;
  title: string;
  summary: string;
  status: string;
  start_date: string;
  due_date: string;
  iteration: Iteration;
  iteration_id: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
