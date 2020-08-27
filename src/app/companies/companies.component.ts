import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../services/companies.service';
import { Observable, from } from 'rxjs';
import { Company } from '../../models/Response/company.model';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})

export class CompaniesComponent implements OnInit {

  searchText:string;
  company: Company ;
  companies: Observable<Company[]>;
 // companyData: any;
  constructor(private companiesService: CompaniesService) { }

  ngOnInit() {
    this.LoadCompany();
  }

  private LoadCompany() {
    this.companies = this.companiesService.readonlyactivitiesModel;
    this.companiesService.getCompanies();
  }

  catchCompany(company: Company){
    this.company = company;

  }

  deleteCompany(company: Company) {

  }

}
