import { Component, OnInit } from '@angular/core';
import { TimeGroupsService } from '../../services/timegroup.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-timegroup',
  templateUrl: './timegroup.component.html',
  styleUrls: ['./timegroup.component.scss'],
})
export class TimegroupComponent implements OnInit {

  searchText:string;
  timegroupList: any;
  timegroupData: any;
  timeGroupNew : any;
  constructor(private timegroups_service: TimeGroupsService,public datepipe: DatePipe) { }

  myFunction(){
    this.timegroupList.timeFrom =new Date();
    let latest_date =this.datepipe.transform(this.timegroupList.timeFrom, 'shortTime');
   }
  
  ngOnInit() {
    this.timegroups_service
    .getTimeGroups()
    .subscribe(lists => {
        this.timegroupList= lists;
        this.timegroupData = this.timegroupList.data;
        //console.log(this.timegroupList);
    });
    
  }

  getTimeGroup(timegroup){
    this.timeGroupNew = timegroup;
    //console.log(  this.timeGroupNew);

  }
}
