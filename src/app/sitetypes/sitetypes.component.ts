import { Component, OnInit } from '@angular/core';
import { SiteTypesService } from '../../services/sitetypes.service';


@Component({
  selector: 'app-sitetypes',
  templateUrl: './sitetypes.component.html',
  styleUrls: ['./sitetypes.component.scss']
})
export class SitetypesComponent implements OnInit {

  searchText:string;
  sitetypesList: any;
  sitetypeData: any;
  siteTypeNew : any ;
  constructor(private sitetypes_service: SiteTypesService) { }

  ngOnInit() {
    this.sitetypes_service
    .getSiteTypes()
    .subscribe(lists => {
        this.sitetypesList= lists;
        this.sitetypeData = this.sitetypesList.data;
        console.log(this.sitetypesList);
    });
  }

  getSiteType(sitetype){
    this.siteTypeNew = sitetype;
    console.log(  this.siteTypeNew);

  }

}
