import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Departments } from 'core/models/departments.model';
import { MainResponse } from 'core/models/mainResponse.model';


@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {
  DepartmentFormData: Departments;
  private endpoint = environment.apiUrl + '/Departments';

  private departmentsBehaviorSubject = new BehaviorSubject<Departments[]>([]);
  private dataStoredepartments: { departments: Departments[] } = { departments: [] };

  readonly readonlyDepartmentsModel = this.departmentsBehaviorSubject.asObservable();

  constructor(public http: HttpClient, private ToastrService: ToastrService) { }

 //#region 00  getDepartments() to read all departments data

  public getAlldepartmentsSubject() {
    this.http.get<Departments[]>(`${this.endpoint}`)
      .subscribe(
        (data: Departments[]) => {
          this.dataStoredepartments.departments = data;
          this.departmentsBehaviorSubject.next(Object.assign({}, this.dataStoredepartments).departments);
          return data;
        }
      )
  }
  //#endregion

  //#region 1 addDepartments method to add new Department
   createDepartments(DepartmentFormData: Departments) {
     this.http.post<Departments>(this.endpoint, DepartmentFormData)
      .subscribe((data: Departments) => {
        this.dataStoredepartments.departments.push(data);
        this.departmentsBehaviorSubject.next(Object.assign({}, this.dataStoredepartments).departments);
        return data;
      });
     
  }
  //#endregion

  //#region 2 updateDepartment() method to update (put verb)
  updateDepartment(id:number, Department: Departments) {
    this.http.put<Departments>(`${this.endpoint}/${id}`, Department)
    .subscribe(
       // ignore result and use the original object "Department" Because the body returned without response in swagger (203)
      //  (result: Departments)=> {
       (Departments)=> {
          let i = 0;
          for (let departmentData of this.dataStoredepartments.departments) {
            debugger;
            if (departmentData.departmentId === Department.departmentId) {
              this.dataStoredepartments.departments[i] = Department;
              break;
            }
            i++;
          }
          debugger
          this.departmentsBehaviorSubject.next(Object.assign({}, this.dataStoredepartments).departments); 
      },
      error => this.ToastrService.error(error,"no data")
    );
  }
  //#endregion

  //#region 3 deleteDepartments() to delete Department
   deleteDepartment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`).pipe(
      catchError(this.errorHandler)
    )
  }
  //#endregion

    //#region 3 deleteDepartments() to delete Department
    getDepartmentById(DepartmentId: number): Observable<void> {
      return this.http.get<void>(`${this.endpoint}/${DepartmentId}`).pipe(
        catchError(this.errorHandler)
      )
    }

  //#region 4 handle errors
  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\n Message: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
  //#endregion

  //#region Subject 
  private transferSubject$ : Subject<Departments> = new Subject<Departments>();

  getDepartmentSubject(){
    return this.transferSubject$;
  }

  setDepartmentSubject(DepartmentId){
    this.transferSubject$.next(DepartmentId);
  }
  //#endregion

}
