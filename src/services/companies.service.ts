import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { environment } from '../environments/environment';
<<<<<<< HEAD
import { Company } from '../models/Response/company.model';
import { MainResponse } from 'models/mainResponse.model';
=======
import { Company } from '../models/companies.model';
>>>>>>> b4278ec84f0cbde1ed7b3d361b793cd28787cd06

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

  public CreateCompanies(company: Company): void {
    this.http.post<Company>(`${this.endpoint}`, company)
      .subscribe(data => {
        this.dataStoreCompany.company.push(data);
          this.companyBehaviorSubject.next(Object.assign({}, this.dataStoreCompany).company);
      }, error => {
        console.error(error);
      });
  }

  Update(company: Company) {
    this.http.put<MainResponse<Company>>(`${this.endpoint}/${company.id}`, company)
      .subscribe((data : MainResponse<Company>) => {
        for(var index = 0; index < this.dataStoreCompany.company.length; index++){
          if(this.dataStoreCompany.company[index].id === company.id){
            this.dataStoreCompany.company[index] = data.data;
            break;
          }
        }
          
          this.companyBehaviorSubject.next(Object.assign({}, this.dataStoreCompany).company);
      }, error => {
        console.error(error);
      });
  }

  Delete(id: number): void{
    this.http.delete(`${this.endpoint}/${id}`)
      .subscribe( (data: Company) => {
        this.dataStoreCompany.company.forEach(e => {
          if(e.id === id){
            const index = this.dataStoreCompany.company.indexOf(e);
            this.dataStoreCompany.company.splice(index, 1);
            this.companyBehaviorSubject.next(Object.assign({}, this.dataStoreCompany).company);
            return;
          }
        });
      });
  }
}
