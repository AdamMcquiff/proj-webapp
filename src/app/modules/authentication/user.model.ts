export class User {
  id: number;
  email: string;
  username: string;
  name: string;
  first_login: boolean;
  password: {
    password: string;
    confirmPassword: string;
  };

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
