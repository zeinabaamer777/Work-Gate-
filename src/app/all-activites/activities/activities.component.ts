import { ToastrService } from 'ngx-toastr';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivitiesService } from '../../../core/services/activities.service';
import { Activities } from '../../../core/models/activities.model';
import { Observable } from 'rxjs';
import { NotificationService } from '../../notification.service';
import { title } from 'process';
import { of } from 'rxjs';
import 'rxjs/add/observable/of';
@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {
 
  searchText:string;

  activitiesData: Activities[];
  activities: Observable<Activities[]>;
  unSaved: boolean = true;   
  constructor(private activitiesService: ActivitiesService,
    private NotificationService: NotificationService,
    private toastr: ToastrService) { }
  //   canDeactivate(): Observable<boolean> | boolean {


  //     if (this.unSaved) {

  //       const result = window.confirm('There are unsaved changes! Are you sure?');

  //        return Observable.of(result);
  //     }
  //     return true;
  // }   

  ngOnInit() {
    this.getAllActivities();
  }

  getAllActivities(){
    this.activities = this.activitiesService.readonlyactivitiesModel;
    this.activitiesService.getAllActivitesSubject();
  }
  // this.toastr.success('Post Added', 'Success');

  deleteActivity(activityId: number){
      this.activitiesService.deleteActivity(activityId).subscribe(
        () => {
          console.log("successfuly deleted");
          // debugger       
          this.getAllActivities();
        });
  }

  //  19/8/2016
  onSelect(selectedActivity: object) {
    this.activitiesService.setActivitySubject(selectedActivity);
}

}
