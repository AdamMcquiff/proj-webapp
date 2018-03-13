export class Iteration {
  id: number;
  title: string;
  summary: string;
  start_date: string;
  due_date: string;
  project_id: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  } 
}
