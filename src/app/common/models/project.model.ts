export class Project {
  id: number;
  title: string;
  summary: string;
  status: string;
  methodology: string;
  budget: number;
  start_date: string;
  due_date: string;
  client_id: number;
  iterations: Array<object>;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
