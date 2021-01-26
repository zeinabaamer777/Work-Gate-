import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { timeGroups } from 'core/models/timeGroups.model';
import { MainResponse } from 'core/models/mainResponse.model';
import { HttpClientCrudService } from './http-client-crud.service';


@Injectable({
  providedIn: 'root'
})
export class TimeGroupsService extends HttpClientCrudService<timeGroups, number>{
  
  timeGroupsFormData: timeGroups;
  private endpoint = environment.apiUrl + '/TimeGroups';

  private behaviorSubjectTimeGroups = new BehaviorSubject<timeGroups[]>([]);
  private dataStoretimeGroups: { time: timeGroups[] } = { time: [] };

  readonly readonlyTimeGroupsModel = this.behaviorSubjectTimeGroups.asObservable();

  // constructor(public http: HttpClient) { }
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.apiUrl}/TimeGroups`);
  }
  public loadtimeGroups() {
    this.findAll()
      .subscribe(
        (data: timeGroups[]) => {
          this.dataStoretimeGroups.time = data;
          this.behaviorSubjectTimeGroups.next(Object.assign({}, this.dataStoretimeGroups).time);
          return data;
        }
      )
  }

  //#region 1 addActivities method to add new activity
   createTimeGroup(activityFormData: timeGroups) {
     this.save(activityFormData)
      .subscribe((data: timeGroups) => {
        this.dataStoretimeGroups.time.push(data);
        this.behaviorSubjectTimeGroups.next(Object.assign({}, this.dataStoretimeGroups).time);
        return data;
      });
     
  }
  //#endregion

  //#region 2 updateActivity() method to update (put verb)
  updateTimeGroup(timeGroup: timeGroups) {
    this.update(timeGroup.id, timeGroup)
    .subscribe(
       (result: MainResponse<timeGroups>)=> {
          let i = 0;
          for (let timeGroupsData of this.dataStoretimeGroups.time) {
            debugger;
            if (timeGroupsData.id === result.data.id) {
              this.dataStoretimeGroups.time[i] = result.data;
              break;
            }
            i++;
          }
          this.behaviorSubjectTimeGroups.next(Object.assign({}, this.dataStoretimeGroups).time); 
      }
    );
  }
  //#endregion

  //#region 3 deleteActivities() to delete Activity
   deleteTimeGroup(id: number): Observable<timeGroups> {
    return this.delete(id).pipe()
  }
  //#endregion

  //#region Subject 
  private transferSubject$ : Subject<timeGroups> = new Subject<timeGroups>();

  getTimeSubject(){
    return this.transferSubject$;
  }

  setTimeSubject(activityId){
    this.transferSubject$.next(activityId);
  }
  //#endregion
}