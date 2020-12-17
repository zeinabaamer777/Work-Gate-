import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SitesService } from 'core/services/sites.service';
import { CompaniesService } from 'core/services/companies.service';
import { NgxSpinnerService } from "ngx-spinner";
import { SpinnerloadingService } from 'core/services/spinnerloading.service';

@Component({
  selector: 'app-site-details',
  templateUrl: './site-details.component.html',
  styleUrls: ['./site-details.component.scss']
})
export class SiteDetailsComponent implements OnInit {
  id: any;
  siteData: any;
  viewSite: any;
  sitelat: number;
  sitelng: number;

  companyDetails: any;
  latlng :Array<number>;
  siteName: any;
  siteAddress: any;
  
  site_response: any;
  company_response: any;
  siteResponseData: any;
  companyResponseData: any;

  @Input() tstViewSite: any;
  @Input() company_name : any;
  companydet:any;
  map_lat: any;
  map_long: any;
  site_name: any;
  site_address: any;
  companyyyyData: any;
  companyById: object;
  constructor(
    private route: ActivatedRoute, 
    private site_service: SitesService
    ) { }
  ngOnInit() {

    this.getData();
    this.getCompany();
    
  }
  ngAfterViewInit(){
    
  }
  getData(){
    console.log("tstViewSite", this.tstViewSite);
    this.map_lat = this.tstViewSite.latitude;
    this.map_long = this.tstViewSite.longitude;
    this.site_name = this.tstViewSite.siteName;
    this.site_address = this.tstViewSite.address;
  }
 
  getCompany(){
    this.site_service
    .getCom()
    .subscribe(res => {
      this.companyyyyData = res;
      this.companyById = this.companyyyyData.find(xxx => xxx.id == this.tstViewSite.companyId);
      // this.zzz = this.companyById.enName;
      console.log("company data", this.companyyyyData);
      console.log("company by id", this.companyById);
    })
  }
}
