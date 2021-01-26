import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, Subject, pipe } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Activities } from 'core/models/activities.model';
import { MainResponse } from 'core/models/mainResponse.model';
import { HttpClientCrudService } from './http-client-crud.service';


@Injectable({
  providedIn: 'root'
})
export class ActivitiesService extends HttpClientCrudService<Activities, number>{
  activityFormData: Activities;
  private endpoint = environment.apiUrl + '/Activities';

  private activitesBehaviorSubject = new BehaviorSubject<Activities[]>([]);
  private dataStoreActivites: { activites: Activities[] } = { activites: [] };

  readonly readonlyactivitiesModel = this.activitesBehaviorSubject.asObservable();

  // constructor(public http: HttpClient) { }
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.apiUrl}/Activities`);
  }
  
  // new code model handeling
  // elly mashta5alsh
  public getAllActivitesSubject() {
    this.findAll()
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
   createActivities(activity: Activities) {
     this.save(activity)
      .subscribe((data: Activities) => {
        this.dataStoreActivites.activites.push(data);
        this.activitesBehaviorSubject.next(Object.assign({}, this.dataStoreActivites).activites);
        return data;
      });
     
  }
  //#endregion

  //#region 2 updateActivity() method to update (put verb)
  updateActivity( id:number, activity: Activities) {
    this.update(id,activity )
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
   deleteActivity(id: number): Observable<Activities> {
    return this.delete(id).pipe();
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
