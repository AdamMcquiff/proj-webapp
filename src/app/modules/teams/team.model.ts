export class Team {
  id: number;
  name: string;
  organisation_id: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
