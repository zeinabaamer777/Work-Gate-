import { NotificationService } from '../../app/notification.service';
import { ToastrService } from 'ngx-toastr';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
// response model
import { Place } from 'core/models/Response/places.model';
// request model
import { createPlace } from 'core/models/Request/createPlcae.model';
import { MainResponse } from 'core/models/mainResponse.model';
import { data } from 'jquery';
import { HttpClientCrudService } from './http-client-crud.service';


@Injectable({
  providedIn: 'root'
})
export class PlacesService extends HttpClientCrudService<Place, number>{
  // private serverUrl = environment.apiUrl;
  // private serverreqHeader = environment.reqHeader;
  private endpoint = environment.apiUrl + "/Places";

  private placeBehaviorSubject = new BehaviorSubject<Place[]>([]);
  private dataStorePlace: { place: Place[]  } = { place: [] };

  readonly readonlyPlacesModel = this.placeBehaviorSubject.asObservable();


  // constructor(public http: HttpClient, private ToastrService: ToastrService, private NotificationService: NotificationService) { }
  constructor(protected _http: HttpClient, private ToastrService: ToastrService, private NotificationService: NotificationService) {
    super(_http, `${environment.apiUrl}/Activities`);
  }
  //#region 0 loadPlaces() method to load all places
  // loadPlaces(): void{
  //   this.http.get<MainResponse<Place[]>>(`${this.endpoint}`)
    
  //   .subscribe(
  //     (data: MainResponse<Place[]>) => {
  //       if (data.code === 200) {
  //         this.dataStorePlace.place = data.data;
  //         this.placeBehaviorSubject.next(Object.assign({}, this.dataStorePlace).place);
  //       }
  //       return data;
  //     }
  //   );


  // }

  // Observable<T[]>
  loadPlaces(){
    this.findAll() 
    .subscribe(
      (data: MainResponse<Place[]>) => {
        if (data.code === 200) {
          this.dataStorePlace.place = data.data;
          this.placeBehaviorSubject.next(Object.assign({}, this.dataStorePlace).place);
        }
        // console.log("data from service", data);
        return data;
      }
    );
  }

  //#endregion

  //#region  createPlace() method to insert new place
   createPlace(place: createPlace) {
    this.save(place)
      .subscribe(
        () => {
          // this.placeBehaviorSubject.next(Object.assign({}, this.dataStorePlace).place)
          this.loadPlaces();
        }
      )
  }
  //#endregion

  //#region updatePlace() method to update existing place 
  updatePlace(id: number, place: Place) {

    this.update(id, place)
      .subscribe(
        () => {
          this.loadPlaces();
        }
      )
  }
  //#endregion

  //#region deletePlace() to delete record from table
  deletePlace(id: number, event: Event): Observable<Place> {
      event.preventDefault();
      event.stopPropagation();
      return this.delete(id).pipe(
        catchError(this.errorHandler)
      )
  }
  //#endregion

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
  private transferSubject$ : Subject<Place> = new Subject<Place>();

  getPlaceSubject(){
    return this.transferSubject$;
  }

  setPlaceSubject(PlaceId){
    this.transferSubject$.next(PlaceId);
  }
  //#endregion

}
