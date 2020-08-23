import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-sites',
  templateUrl: './sites-list-details.component.html',
  styleUrls: ['./sites-list-details.component.scss']
})
export class SitesListDetailsComponent implements OnInit {
  
  site: any;
  company_name: any;
  
  constructor() { }

  ngOnInit(): void {
  }

  SelectData(data: any){
    this.site = data;
  }
  selectCompany(c: any)
  {
    this.company_name = c;
  }
}
