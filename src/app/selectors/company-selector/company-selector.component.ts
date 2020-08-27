import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Company } from 'app/model/Response/company.model';

@Component({
  selector: 'app-company-selector',
  templateUrl: './company-selector.component.html',
  styleUrls: ['./company-selector.component.scss']
})
export class CompanySelectorComponent implements OnInit {

  companies: Company[];
  selectedObject: Company;

  @Output()
  companiesOut = new EventEmitter<Company>();

  constructor() { }

  ngOnInit(): void {

  }

  @Input()
  set passActivities(company: Company[]){
    this.companies = company;
    this.companiesOut.emit(company[0]);
    
  }

  public selectCompany(){
    this.companiesOut.emit(this.selectedObject);
  }

}
