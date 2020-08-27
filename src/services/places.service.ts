import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Place } from '../models/Response/place.model';
import { MainResponse } from '../models/mainResponse.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  
  private serverUrl = environment.apiUrl;
  private endpoint = "Places" ;
  private serverreqHeader = environment.reqHeader;


  private _endpoint = environment.apiUrl + "/Places";

  private placeBehaviorSubject = new BehaviorSubject<Place[]>([]);
  private dataStorePlace: { place: Place[] } = { place: [] };

  readonly readonlyPlacesModel = this.placeBehaviorSubject.asObservable();

  constructor(public http: HttpClient) { }

  public getPlaces(): Observable<object[]>{
    
    return this.http.get<object[]>(`${this.serverUrl}/${this.endpoint}`)
    .pipe(map((res : any) => {
      // console.log(res);

      return res.data;
    }))
  }

  public loadPlaces(): void{

    this.http.get<MainResponse<Place[]>>(`${this._endpoint}`)
      .subscribe(
        (data: MainResponse<Place[]>) => {
          if(data.code === 200){
            this.dataStorePlace.place = data.data;
            this.placeBehaviorSubject.next(Object.assign({}, this.dataStorePlace).place);
          }
        }
      );

  }

  // Get Government 
  public getgovernment(CountryId : number): Observable<object[]>{
    
    return this.http.get<object[]>(`${this.serverUrl}/${this.endpoint}`,{headers : this.serverreqHeader})
    .pipe(map((res : any) => {
      return res.data;
    }))
  }




}
