import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { TimeGroupsService } from '../../../services/timegroup.service';
import { DatePipe } from '@angular/common'
import { timeGroups } from 'models/timeGroups.model';
import { DialogService } from 'services/dialog.service';
import { NotificationDialogService } from 'services/notificationDialog.service';

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

  timeGroupsData : Observable<timeGroups[]>
  timeGroup: timeGroups;

  constructor(private timeGroupsService: TimeGroupsService,
    private dialogService: DialogService,
    private notificationDialogService: NotificationDialogService,
    private datePipe: DatePipe) { }

  // myFunction(){
  //   this.timegroupList.timeFrom =new Date();
  //   let latest_date =this.datepipe.transform(this.timegroupList.timeFrom, 'shortTime');
  //  }
  
  ngOnInit() {
   this.loadTimeGroups();
    
  }

  
  //#region loadTimeGroups()
  loadTimeGroups(){
    this.timeGroupsData = this.timeGroupsService.readonlyTimeGroupsModel;
    this.timeGroupsService.loadtimeGroups();
    console.log(this.timeGroupsData)
  }
  //#region 

  //#region 1 catchTimeGroup() method to transfer data to form on click on it
  catchTimeGroup(timeGroup: timeGroups){
    // this.timeGroup = timeGroup;
    // console.log(this.timeGroup)
   
      this.timeGroupsService.setTimeSubject(timeGroup);
      console.log(timeGroup);
    
  }
  //#region 

  //#region 2 deleteTimeGroup()
  deleteTimeGroup(timeGroup: timeGroups){

    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.timeGroupsService.deleteTimeGroup(timeGroup.id).subscribe(
      () => {
        this.loadTimeGroups();
        this.notificationDialogService.warn('Deleted successfully!');
      }, 
      err => {

      })
        
      }
    });
  }
  //#region 



}
