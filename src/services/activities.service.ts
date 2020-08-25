import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, Subject, pipe } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Activities } from 'app/model/activities.model';
import { MainResponse } from 'app/model/mainResponse.model';


@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  activityFormData: Activities;
  private endpoint = environment.apiUrl + '/Activities';

  private activitesBehaviorSubject = new BehaviorSubject<Activities[]>([]);
  private dataStoreActivites: { activites: Activities[] } = { activites: [] };

  readonly readonlyactivitiesModel = this.activitesBehaviorSubject.asObservable();

  constructor(public http: HttpClient) { }
  // new code model handeling
  // elly mashta5alsh
  public getAllActivitesSubject() {
    this.http.get<Activities[]>(`${this.endpoint}`)
      .subscribe(
        (data: Activities[]) => {
          this.dataStoreActivites.activites = data;
          this.activitesBehaviorSubject.next(Object.assign({}, this.dataStoreActivites).activites);
          return data;
        }
      )
  }

  //#region 00  getActivities() to read all activites data
  //  getActivities(): Observable<Activities[]> {
  //   return this.http.get<Activities[]>(this.endpoint)
  // }

  // getActivities()
  //#endregion

  //#region 1 addActivities method to add new activity
   createActivities(activityFormData: Activities) {
     this.http.post<Activities>(this.endpoint, activityFormData)
      .subscribe((data: Activities) => {
        this.dataStoreActivites.activites.push(data);
        this.activitesBehaviorSubject.next(Object.assign({}, this.dataStoreActivites).activites);
        return data;
      });
     
  }
  //#endregion

  //#region 2 updateActivity() method to update (put verb)
  updateActivity( id:number, activity: Activities) {
    this.http.put<MainResponse<Activities>>(`${this.endpoint}/${id}`, activity)
    .subscribe(
       (result: MainResponse<Activities>)=> {
          let i = 0;
          for (let activityData of this.dataStoreActivites.activites) {
            debugger;
            if (activityData.activityId === result.data.activityId) {
              this.dataStoreActivites.activites[i] = result.data;
              break;
            }
            i++;
          }
          this.activitesBehaviorSubject.next(Object.assign({}, this.dataStoreActivites).activites); 
      }
    );
  }
  //#endregion

  //#region 3 deleteActivities() to delete Activity
   deleteActivity(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`).pipe(
      catchError(this.errorHandler)
    )
  }
  //#endregion

    //#region 3 deleteActivities() to delete Activity
    getActivityById(activityId: number): Observable<void> {
      return this.http.get<void>(`${this.endpoint}/activityId`).pipe(
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
  private transferSubject$ : Subject<Activities> = new Subject<Activities>();

  getActivitySubject(){
    return this.transferSubject$;
  }

  setActivitySubject(activityId){
    this.transferSubject$.next(activityId);
  }
  //#endregion

}
