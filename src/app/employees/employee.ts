export class Employee {

  constructor(id: number, first_name: string, email: string, avatar: string) {
    this.id = id;
    this.first_name = first_name;
    this.email = email;
    this.avatar = avatar;
  }

  id: number;
  first_name: string;
  email: string;
  avatar: string;
}
