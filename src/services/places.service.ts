import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  
  private serverUrl = environment.apiUrl;
  private endpoint = "Places" ;
  private serverreqHeader = environment.reqHeader;
  constructor(public http: HttpClient) { }
  public getPlaces(): Observable<object[]>{
    
    return this.http.get<object[]>(`${this.serverUrl}/${this.endpoint}`)
    .pipe(map((res : any) => {
      // console.log(res);

      return res.data;
    }))
  }

  // Get Government 
  public getgovernment(CountryId : number): Observable<object[]>{
    
    return this.http.get<object[]>(`${this.serverUrl}/${this.endpoint}`,{headers : this.serverreqHeader})
    .pipe(map((res : any) => {
      return res.data;
    }))
  }




}
