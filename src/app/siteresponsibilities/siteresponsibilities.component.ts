import { Component, OnInit } from '@angular/core';
import { SiteResponsibilitiesService } from '../../services/siteresponsibilities.service';
import { Observable } from 'rxjs';
import { SiteResponsibility } from 'models/Response/siteResponsibility.model';

@Component({
  selector: 'app-siteresponsibilities',
  templateUrl: './siteresponsibilities.component.html',
  styleUrls: ['./siteresponsibilities.component.scss']
})
export class SiteresponsibilitiesComponent implements OnInit {

  searchText:string;
  siteResponsibility: SiteResponsibility;
  //siteuserresponsibilityData: any;
  siteResponsibilities: Observable<SiteResponsibility[]>;
  constructor(private siteResponsibilitiesService: SiteResponsibilitiesService) { }

  ngOnInit() {
    this.loadSiteResponsibility();
  }

  loadSiteResponsibility() {
    this.siteResponsibilities = this.siteResponsibilitiesService.readonlySiteResponsibilityModel;
    this.siteResponsibilitiesService.getSiteResponsibilities();
  }

  catchSiteResponsibility(siteResponsibility: SiteResponsibility){
    this.siteResponsibility = siteResponsibility;
    // console.log(siteResponsibility);
  }

  deleteSiteResponsibility(siteResponsibility: SiteResponsibility) {
    this.siteResponsibilitiesService.deleteSiteResponsibility(siteResponsibility.siteResponsibilityId);
  }

}
