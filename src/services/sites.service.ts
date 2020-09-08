import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, pipe, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import {forkJoin} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SitesService {

  private serverUrl = environment.apiUrl;
  private endpoint = "en/Sites/AllSites";
  private companyendpoint = "companies";


  constructor(public http: HttpClient) { }

  public getSites(): Observable<object[]>{

    return this.http.get<object[]>(`${this.serverUrl}/${this.endpoint}`)
    .pipe(map((res : any) => {
      // console.log(res);
      return res;
    }));
    
  }

  public getCom(): Observable <object[]>{
    return this.http.get<object[]>(`${this.serverUrl}/${this.companyendpoint}`)
    .pipe(map((res : any) => {
      return res;
      console.log(res);
    }))
  }
  // Uses forkJoin() to run multiple concurrent http.get() requests.
  // The entire operation will result in an error state if any single request fails.
  public getSitesAndCompanies() : Observable<any> {
    const sites_response = this.http.get(`${this.serverUrl}/${this.endpoint}`);
    const companies_response = this.http.get(`${this.serverUrl}/${this.companyendpoint}`);
    return forkJoin([sites_response, companies_response]);
  }
}
