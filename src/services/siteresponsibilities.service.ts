import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SiteResponsibilitiesService {
  private serverUrl = environment.apiUrl;
  private endpoint = "SiteResponsibilities" ;
  private serverreqHeader = environment.reqHeader;
 
  constructor(public http: HttpClient) { }
  public getSiteResponsibilities(): Observable<object[]>{
    return this.http.get<object[]>(`${this.serverUrl}/${this.endpoint}`)
    .pipe(map((res : any) => {
      console.log("API response", res);
      return res;
    }))
}
}