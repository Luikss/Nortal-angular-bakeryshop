import { EmployeeService } from './employee.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { EmployeeData } from './models/employee.model';

describe("EmployeeService", () => {
    let service: EmployeeService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [EmployeeService]
        });
        service = TestBed.get(EmployeeService);
        httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should retrieve expected data from the API', () => {
        const expectedData: EmployeeData[] = [
            { id: 1, email: "george.bluth@reqres.in", first_name: "George", last_name: "Bluth", avatar: "https://reqres.in/img/faces/1-image.jpg" },
            { id: 2, email: "janet.weaver@reqres.in", first_name: "Janet", last_name: "Weaver", avatar: "https://reqres.in/img/faces/2-image.jpg" },
            { id: 3, email: "emma.wong@reqres.in", first_name: "Emma", last_name: "Wong", avatar: "https://reqres.in/img/faces/3-image.jpg" },
            { id: 4, email: "eve.holt@reqres.in", first_name: "Eve", last_name: "Holt", avatar: "https://reqres.in/img/faces/4-image.jpg" },
            { id: 5, email: "charles.morris@reqres.in", first_name: "Charles", last_name: "Morris", avatar: "https://reqres.in/img/faces/5-image.jpg" },
            { id: 6, email: "tracey.ramos@reqres.in", first_name: "Tracey", last_name: "Ramos", avatar: "https://reqres.in/img/faces/6-image.jpg" }
        ];

        service.getEmployees().subscribe(employees => {
            expect(employees.length).toBe(6);
            expect(employees).toEqual(expectedData);
        });

        const request = httpMock.expectOne(service.apiUrlUsers);
        expect(request.request.method).toBe('GET');
        request.flush(expectedData);
    });
});
