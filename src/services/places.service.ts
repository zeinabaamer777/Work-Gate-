import { NotificationService } from './../app/notification.service';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
// response model
import { Place } from '../models/Response/places.model';
// request model
import { createPlace } from '../models/Request/createPlcae.model';
import { MainResponse } from '../models/mainResponse.model';
import { data } from 'jquery';


@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  // private serverUrl = environment.apiUrl;
  // private serverreqHeader = environment.reqHeader;
  private endpoint = environment.apiUrl + "/Places";

  private placeBehaviorSubject = new BehaviorSubject<Place[]>([]);
  private dataStorePlace: { place: Place[] } = { place: [] };

  readonly readonlyPlacesModel = this.placeBehaviorSubject.asObservable();

  constructor(public http: HttpClient, private ToastrService: ToastrService,private NotificationService: NotificationService) { }

//#region 0 loadPlaces() method to load all places 
  loadPlaces(): Observable<MainResponse<Place[]>> {

    return new Observable(ret => {
      
      this.http.get<MainResponse<Place[]>>(`${this.endpoint}`)
      .subscribe((data: MainResponse<Place[]>) => {
          if(data.code === 200){
            this.dataStorePlace.place = data.data;
            this.placeBehaviorSubject.next(Object.assign({}, this.dataStorePlace).place);
          }});
    });
    

  }
//#endregion

//#region  createPlace() method to insert new place
public createPlace(place: createPlace){
    this.http.post<MainResponse<createPlace[]>>(`${this.endpoint}`, place)
    .subscribe(
      (data: MainResponse<createPlace[]>) => {
        // this.dataStorePlace.place.push(data);
        // this.placeBehaviorSubject.next(Object.assign({}, this.dataStorePlace).place)
      }
    )
}
//#endregion

//#region updatePlace() method to update existing place 
updatePlace(id: number, place: Place){
  this.http.put<MainResponse<Place[]>>(`${this.endpoint}/${id}`,place)
  .subscribe(
    (data: MainResponse<Place[]>) => {
      let i = 0;
      for (let placeData of this.dataStorePlace.place) {
        debugger;
        if (placeData.id === place.id) {
          this.dataStorePlace.place[i] = place;
          break;
        }
        i++;
      }
      debugger
      this.placeBehaviorSubject.next(Object.assign({}, this.dataStorePlace).place); 
    }
  )
}
//#endregion

//#region deletePlace() to delete record from table
deletePlace(id: number): Observable<void>{
  return this.http.delete<void>(`${this.endpoint}/${id}`).pipe(
    catchError(this.errorHandler)
  )
}
//#endregion

  // Get Government 
  // public getgovernment(CountryId : number): Observable<object[]>{
    
  //   return this.http.get<object[]>(`${this.serverUrl}/${this.endpoint}`,{headers : this.serverreqHeader})
  //   .pipe(map((res : any) => {
  //     return res.data;
  //   }))
  // }

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


}
