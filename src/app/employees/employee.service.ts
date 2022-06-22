import { environment } from '../../environments/environment';
import { Employee } from './employee';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  apiUrlUsers = environment.apiUrlUsers;

  constructor(private _http: HttpClient) {}

  getEmployees(): Observable<any> {
    return this._http.get<Employee[]>(this.apiUrlUsers);
  }
}
