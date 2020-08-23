import { Component, OnInit } from '@angular/core';
import { DivisionsService } from '../../services/divisions.service';

@Component({
  selector: 'app-divisions',
  templateUrl: './divisions.component.html',
  styleUrls: ['./divisions.component.scss']
})
export class DivisionsComponent implements OnInit {

  searchText:string;
  divisionsList: any;
  divisionNew : any;
 // companyData: any;
  constructor(private divisions_service: DivisionsService) { }

  ngOnInit() {
    this.divisions_service
    .getDivisions()
    .subscribe(lists => {
        this.divisionsList= lists;
       // this.companyData = this.companiesList.data;

        // console.log(this.divisionsList);
    });

  }

  getDivision(division){
    this.divisionNew = division;
    // console.log(  this.divisionNew);

  }


}
