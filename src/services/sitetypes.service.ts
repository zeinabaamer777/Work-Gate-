import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { SiteType } from 'models/Response/siteType.model';
import { MainResponse } from 'models/mainResponse.model';


@Injectable({
  providedIn: 'root'
})
export class SiteTypesService {

  private endpoint = environment.apiUrl + "/SiteTypes";

  private siteTypeBehaviorSubject = new BehaviorSubject<SiteType[]>([]);
  private dataStoreSiteType: { siteType: SiteType[] } = { siteType: [] };

  readonly readonlySiteTypeModel = this.siteTypeBehaviorSubject.asObservable();


  constructor(private http: HttpClient) { }

   getSiteTypes(): void {
    this.http.get<MainResponse<SiteType[]>>(`${this.endpoint}`)
      .subscribe(
        (data: MainResponse<SiteType[]>) => {
          if(data.code === 200){
            this.dataStoreSiteType.siteType = data.data;
            this.siteTypeBehaviorSubject.next(Object.assign({}, this.dataStoreSiteType).siteType);
          }
        }
      );
  }

   CreateSiteType(siteType: SiteType): void {
    debugger;
    this.http.post<SiteType>(`${this.endpoint}`, siteType)
      .subscribe(data => {
        this.getSiteTypes();
      }, error => {
        console.error(error);
      });
  }

   Update(siteType: SiteType) {
    this.http.put<SiteType>(`${this.endpoint}/${siteType.siteTypeId}`, siteType)
      .subscribe((data : SiteType) => {
        this.getSiteTypes();
      }, error => {
        console.error(error);
      });
  }

   Delete(id: number): void{
    this.http.delete(`${this.endpoint}/${id}`)
      .subscribe( (data: SiteType) => {
        this.dataStoreSiteType.siteType.forEach(e => {
          if(e.siteTypeId === id){
            const index = this.dataStoreSiteType.siteType.indexOf(e);
            this.dataStoreSiteType.siteType.splice(index, 1);
            this.siteTypeBehaviorSubject.next(Object.assign({}, this.dataStoreSiteType).siteType);
            return;
          }
        });
      });
  }
}