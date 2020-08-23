import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { GetLocationForUserInSpecificDateService } from '../../services/get-location-for-user-in-specific-date.service'
import { UsersService } from 'services/users.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SiteAttandanceVM } from 'app/model/siteAttandanceVM.model';
import { LocationsList } from 'app/model/locationsList.model';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  minDate: Date;
  maxDate: Date;
  bsConfig: Partial<BsDatepickerConfig>;
  colorTheme = 'theme-red';
  userId: string;

  @Input() tstViewUser: any;
  @Input() siteTimeGroupsData;

  @Input() userIdd: string;
  @Input() siteAttandanceVM: SiteAttandanceVM[];
  @Input() listOflocations: LocationsList[];
  
  //userId,data.siteAttandanceVM.dateOfCreate
  constructor( private datePipe: DatePipe, private getLocationForUserInSpecificDateService: GetLocationForUserInSpecificDateService,
    private route: ActivatedRoute,
    private userService: UsersService) {
    this.minDate = new Date();
    this.maxDate = new Date();
    // this.maxDate.setDate(this.maxDate.getDate());
    this.minDate.setDate(this.maxDate.getDate() - 60);
  }
  
  //#region updateMyDate function to detect the selected date 
  selectedStartDate: Date;
  updateMyDate(newDate: string) {
    selectedStartDate: this.maxDate;
    this.siteAttandanceVM = [];
    this.listOflocations = [];
    newDate = this.datePipe.transform(newDate, 'yyyy-MM-dd');
    console.log(newDate);
    if(this.userIdd == null || this.userIdd == '' || !newDate || this.siteAttandanceVM.length || this.listOflocations.length) return;
    
    this.siteAttandanceVM = [];
    this.listOflocations = [];
    this.getLocationForUserInSpecificDate(this.userIdd,newDate);
  }
  //#endregion

  ngOnInit() {
    this.bsConfig = {
      containerClass: this.colorTheme,
      dateInputFormat: 'DD-MM-YYYY',
      isAnimated: true
    };
    this.userService.getDate().subscribe(res => {
      this.updateMyDate(null);
      this.selectedStartDate = null;
    });
  }

//#region  fire getLocationForUserInSpecificDateService to get siteAttandanceVM and locations from the API
  getLocationForUserInSpecificDate(userId: string, date: string) {
    this.siteAttandanceVM = [];
    this.listOflocations = [];

    this.getLocationForUserInSpecificDateService
      .GetLocationSiteAttandnce(userId, date);

      this.getLocationForUserInSpecificDateService
        .attendences.subscribe(e => {
          this.siteAttandanceVM = [];
          this.siteAttandanceVM = e;
         
        });

        this.getLocationForUserInSpecificDateService
        .locations.subscribe(location => {
          this.listOflocations = [];
          this.listOflocations = location;
        });
  }
  //#endregion
}
