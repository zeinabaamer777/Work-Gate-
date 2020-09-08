import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserSiteGroupsService {

  private serverUrl = environment.apiUrl;
  private endpoint = "UserSiteGroups/GetGroupTimeForUser";


  constructor(public http: HttpClient) { }

  public getUserSiteGroups(userId: string): Observable<object[]>{

    return null;
    
  }
}
