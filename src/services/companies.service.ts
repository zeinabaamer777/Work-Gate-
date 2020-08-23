import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {  

  private serverUrl = environment.apiUrl;
  private endpoint = "Companies" ;
  private serverreqHeader = environment.reqHeader; 
  constructor(public http: HttpClient) { }
  public getCompanies(): Observable<object[]>{
    
    return this.http.get<object[]>(`${this.serverUrl}/${this.endpoint}`,{headers : this.serverreqHeader})
    .pipe(map((res : any) => {
      // console.log(res);
      return res;
    }))
  }
}
