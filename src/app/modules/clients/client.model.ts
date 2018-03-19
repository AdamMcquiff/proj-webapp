import { User } from "../authentication/user.model";

export class Client {
  id: number;
  name: string;
  summary: string;
  
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
