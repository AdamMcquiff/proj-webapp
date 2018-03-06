export class Project {
  id: number;
  title: string;
  summary: string;
  status: string;
  methodology: string;
  budget: number;
  client_id: number;
  iterations: Array<object>;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
