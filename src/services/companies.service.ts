import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { environment } from '../environments/environment';
import { Company } from '../models/companies.model';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  private endpoint = environment.apiUrl + "/Companies";

  private companyBehaviorSubject = new BehaviorSubject<Company[]>([]);
  private dataStoreCompany: { company: Company[] } = { company: [] };

  readonly readonlyactivitiesModel = this.companyBehaviorSubject.asObservable();

  constructor(private http: HttpClient) { }

  public getCompanies(): void {

    this.http.get<Company[]>(`${this.endpoint}`)
      .subscribe(
        (data: Company[]) => {
          this.dataStoreCompany.company = data;
          this.companyBehaviorSubject.next(Object.assign({}, this.dataStoreCompany).company);
        }
      );

  }
}
