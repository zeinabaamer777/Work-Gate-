import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { LocationInSoecificDate } from '../models/locationInSpecificDate.model';
import { SiteAttandanceVM } from '../models/siteAttandanceVM.model';
import { LocationsList } from '../models/locationsList.model';
import { MainResponse } from '../models/mainResponse.model';

@Injectable({
  providedIn: 'root'
})
export class GetLocationForUserInSpecificDateService {

  // private serverUrl = environment.apiUrl;

  private endpoint = environment.apiUrl + '/Locations/GetLocationForUserInSpecificDate';

  private serverreqHeader = environment.reqHeader;

  private privateSiteAttandanceBehaviorSubject = new BehaviorSubject<SiteAttandanceVM[]>([]);
  private dataStoreSiteAttandance: { siteAttendance: SiteAttandanceVM[] } = { siteAttendance: [] };

  //siteAttendance   => location
  //SiteAttandanceVM =>LocationsList

  // locations list
  private locationsListBehaviorSubject = new BehaviorSubject<LocationsList[]>([]);
  private dataStorelocationsList: { _location: LocationsList[] } = { _location: [] };

  readonly attendences = this.privateSiteAttandanceBehaviorSubject.asObservable();
  readonly locations = this.locationsListBehaviorSubject.asObservable();

  constructor(public http: HttpClient) { }

  public GetLocationSiteAttandnce(userId: string, date: string) {
    this.http.get<MainResponse<LocationInSoecificDate>>(`${this.endpoint}?userId=${userId}&date=${date}`)
      .subscribe((data: MainResponse<LocationInSoecificDate>) => {
        // attendence
        this.dataStoreSiteAttandance.siteAttendance = data.data.siteAttandanceVM;
        this.privateSiteAttandanceBehaviorSubject.next(Object.assign({}, this.dataStoreSiteAttandance).siteAttendance);
       
        // locations
        this.dataStorelocationsList._location = data.data.location;
        this.locationsListBehaviorSubject.next(Object.assign({}, this.dataStorelocationsList)._location);
        return data;

      });
  }
}
