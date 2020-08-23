import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../services/companies.service';


@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

  searchText:string;
  companiesList: any;
  companyNew: any ;
 // companyData: any;
  constructor(private companies_service: CompaniesService) { }

  ngOnInit() {
    this.companies_service
    .getCompanies()
    .subscribe(lists => {
        this.companiesList= lists;
       // this.companyData = this.companiesList.data;

        console.log(this.companiesList);
    });
  }

  getCompany(company){
    this.companyNew = company;
    console.log(  this.companyNew);

  }

}
