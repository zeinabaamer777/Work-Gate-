import { Component, OnInit } from '@angular/core';
import { SiteResponsibilitiesService } from '../../services/siteresponsibilities.service';

@Component({
  selector: 'app-siteresponsibilities',
  templateUrl: './siteresponsibilities.component.html',
  styleUrls: ['./siteresponsibilities.component.scss']
})
export class SiteresponsibilitiesComponent implements OnInit {

  searchText:string;
  siteresponsibilitiesList: any;
  siteresponsibilityNew: any;
  //siteuserresponsibilityData: any;
  constructor(private siteresponsibilities_service: SiteResponsibilitiesService) { }

  ngOnInit() {
    this.siteresponsibilities_service
    .getSiteResponsibilities()
    .subscribe(lists => {
        this.siteresponsibilitiesList= lists;
        //this.siteuserresponsibilityData = this.siteuserresponsibilitiesList.data;
        console.log(this.siteresponsibilitiesList);
    });
  }
  getSiteResposibility(siteresponsibility){
    this.siteresponsibilityNew = siteresponsibility;
    console.log( "Data From getSiteResposibility" ,this.siteresponsibilityNew);

  }


}
