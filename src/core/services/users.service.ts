import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private serverUrl = environment.apiUrl;
  private endpoint = "dashboard/Users" ;


  initinalValue = this.http.get<object[]>(`${this.serverUrl}/${this.endpoint}`);

  private date = new Subject<any>();

  private userAtt = new Subject<any>();

  getuserAtt(){
    return this.userAtt;
  }
  setUserAtt(){
    this.userAtt.next(null);
  }
  
  getDate(){
    return this.date;
  }
  setDate(){
    this.date.next(null);
  }


  
  constructor(public http: HttpClient) { }
  public getUsers(): Observable<object[]>{
    return this.http.get<object[]>(`${this.serverUrl}/${this.endpoint}`)
    .pipe(map((res : any) => {
      // console.log(res);
      return res;
    }))
  }
}
