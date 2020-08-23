import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  private serverUrl = environment.apiUrl;
  private endpoint = "Departments" ;
  private serverreqHeader = environment.reqHeader; 
  
  constructor(public http: HttpClient) { }

  public getDepartments(): Observable<object[]>{
    
    
    return this.http.get<object[]>(`${this.serverUrl}/${this.endpoint}`,{headers : this.serverreqHeader})
    .pipe(map((res : any) => {
      console.log("API response", res);
      return res;
    }))
}
}