import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SitesService } from 'core/services/sites.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss']
})
export class SitesComponent implements OnInit {
  searchText: string;
  sitesList: any;
  sitesData: any;
  id: any;
  _site: any;
  companyyyyData: any;
  @Output() viewSite: EventEmitter<any> = new EventEmitter<any>();
  @Output() company_name: EventEmitter<any> = new EventEmitter<any>();
  company_dd: any;
  companyResponseData: any;
  siteResponseData;
  company_response: any;
  site_response: any;
  companyByIdFromSites: any;
  // company_name: any;
  constructor( private sits_service: SitesService, private router: Router, private route: ActivatedRoute) { 
  }

  ngOnInit() {
    this.getSites();
    // this.getCompany();
  }

  getSites() {
    this.sits_service
      .getSites()
      .subscribe(lists => {
        this.sitesList = lists;
        this.sitesData = this.sitesList.data;
        console.log('Sites: ');
        console.log(this.sitesData);

      });
  }
  // getCompany() {
  //   this.viewSite.emit(id);
  //    this.sits_service
  //     .getCom()
  //     .subscribe(res => {
  //       this.companyyyyData = res;
  //       this.companyByIdFromSites = this.companyyyyData.find(xxx => xxx.id === 3)
  //       console.log("company data", this.companyyyyData);
  //       console.log("companyByIdFromSites", this.companyByIdFromSites);
  //     })
  // }
  getSitesAndCompanies() {
    this.sits_service.getSitesAndCompanies()
      .subscribe(res => {
        console.log("CS res", res);
        // this.site_response = res[0];
        // this.company_response = res[1];
        this.siteResponseData = res[0].data.filter(sid => sid.siteId == this.id)[0];
        this.companyResponseData = res[1].filter(xx => xx.id == this.siteResponseData.companyId)[0];

        console.log("AA", this.siteResponseData);
        console.log("BB", this.companyResponseData);
      });
  }

  gotoDetails(SingleSiteDetails: any) {
     this.viewSite.emit(SingleSiteDetails);
     
     this.sits_service
      .getCom()
      .subscribe(res => {
        this.companyyyyData = res;
        debugger;
        this.companyByIdFromSites = this.companyyyyData
        .find(xxx => xxx.id === SingleSiteDetails.companyId);

        this.company_name.emit(this.companyByIdFromSites.enName);
        
        console.log("company Name: " ,this.companyByIdFromSites.enName);
      })
  }
}