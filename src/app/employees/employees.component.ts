import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  employees$: Employee[];
  form: FormGroup;

  constructor(private employeeService: EmployeeService,
              private fb: FormBuilder) {
  }

  get id() { return this.form.get('id'); }
  get name() { return this.form.get('name'); }
  get email() { return this.form.get('email'); }
  get avatar() { return this.form.get('avatar'); }

  ngOnInit() {
    this.initForm();
    this.employeeService.getEmployees().subscribe(data => this.employees$ = data.data);
  }

  private initForm(): void {
    this.form = this.fb.group({
      id: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
      name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z\s ]*$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      avatar: new FormControl('', Validators.required)
    });
  }

  addEmployee(): void {
    if (this.id.valid && this.name.valid && this.email.valid && this.avatar.valid) {
      const newEmployee: Employee = {
        id: this.form.get('id').value,
        first_name: this.form.get('name').value,
        email: this.form.get('email').value,
        avatar: this.form.get('avatar').value
      };
      this.employees$.push(newEmployee);
      this.initForm();
    }
  }

  deleteEmployee(button): void {
    this.employees$.splice(button.target.id, 1);
  }
}
