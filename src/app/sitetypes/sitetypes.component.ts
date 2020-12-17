import { Component, OnInit } from '@angular/core';
import { SiteTypesService } from '../../core/services/sitetypes.service';
import { SiteType } from 'core/models/Response/siteType.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-sitetypes',
  templateUrl: './sitetypes.component.html',
  styleUrls: ['./sitetypes.component.scss']
})
export class SitetypesComponent implements OnInit {

  searchText:string;
  siteTypes: Observable<SiteType[]>;
  siteType: SiteType;
  constructor(private siteTypesService: SiteTypesService) { }

  ngOnInit() {
    this.loadSiteType();
  }

  loadSiteType(){
    this.siteTypes = this.siteTypesService.readonlySiteTypeModel;
    this.siteTypesService.getSiteTypes();
  }

  catchSiteType(siteType: SiteType){

    this.siteType = siteType;

  }

  deleteSiteType(siteType: SiteType) {
    this.siteTypesService.deleteSiteType(siteType.siteTypeId);
  }
 
}
