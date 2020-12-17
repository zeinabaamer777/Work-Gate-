import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { SiteResponsibility } from 'core/models/Response/siteResponsibility.model';


@Injectable({
  providedIn: 'root'
})
export class SiteResponsibilitiesService {

  private endpoint = environment.apiUrl + "/SiteResponsibilities";

  private siteResponsibilityBehaviorSubject = new BehaviorSubject<SiteResponsibility[]>([]);
  private dataStoreSiteResponsibility: { SiteResponsibility: SiteResponsibility[] } = { SiteResponsibility: [] };

  readonly readonlySiteResponsibilityModel = this.siteResponsibilityBehaviorSubject.asObservable();

  constructor(private http: HttpClient) { }

  public getSiteResponsibilities(): void {
    this.http.get<SiteResponsibility[]>(`${this.endpoint}`)
      .subscribe((data: SiteResponsibility[]) => {
        this.dataStoreSiteResponsibility.SiteResponsibility = data;
        this.siteResponsibilityBehaviorSubject.next(Object.assign({}, this.dataStoreSiteResponsibility).SiteResponsibility);
      });
  }

  public createSiteResponsibility(siteResponsibility: SiteResponsibility): void {
    this.http.post<SiteResponsibility>(`${this.endpoint}`, siteResponsibility)
      .subscribe((data: SiteResponsibility) => {
        this.dataStoreSiteResponsibility.SiteResponsibility.push(data);
        this.siteResponsibilityBehaviorSubject.next(Object.assign({}, this.dataStoreSiteResponsibility).SiteResponsibility);
      });
  }

  public updateSiteResponsibility(siteResponsibility: SiteResponsibility): void {
    this.http.put<SiteResponsibility>(`${this.endpoint}/${siteResponsibility.siteResponsibilityId}`, siteResponsibility)
    .subscribe((data: SiteResponsibility) => {
      this.getSiteResponsibilities();
    });
  }

  public deleteSiteResponsibility(siteResponsibilityId: number) {
    this.http.delete<SiteResponsibility>(`${this.endpoint}/${siteResponsibilityId}`)
        .subscribe(
          (data: SiteResponsibility) => {
            this.dataStoreSiteResponsibility.SiteResponsibility.forEach(e => {
              if(e.siteResponsibilityId === siteResponsibilityId){
                const index = this.dataStoreSiteResponsibility.SiteResponsibility.indexOf(e);
                this.dataStoreSiteResponsibility.SiteResponsibility.splice(index, 1);
                this.siteResponsibilityBehaviorSubject.next(Object.assign({}, this.dataStoreSiteResponsibility).SiteResponsibility);
                return;
              }
            });
          },
          error => {
            
          }
        );
  }

  
}