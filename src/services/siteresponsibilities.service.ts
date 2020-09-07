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
 
  constructor(public http: HttpClient) { }
  
  public getSiteResponsibilities(): Observable<object[]>{
    return null;
}
}