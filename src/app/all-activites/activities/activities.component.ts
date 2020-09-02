import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from '../../../services/activities.service';
import { Activities } from '../../../models/activities.model';
import { Observable } from 'rxjs';
import { NotificationService } from '../../notification.service';
import { title } from 'process';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {

  searchText:string;

  activitiesData: Activities[];
  activities: Observable<Activities[]>;

  constructor(private activitiesService: ActivitiesService,
    private NotificationService: NotificationService,
    private toastr: ToastrService) { }

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
