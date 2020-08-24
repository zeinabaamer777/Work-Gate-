import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from '../../services/activities.service';
import { Activities } from 'app/model/activities.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {

  searchText:string;

  activitiesData: Activities[];
  activities: Observable<Activities[]>;

  constructor(private activitiesService: ActivitiesService) { }

  ngOnInit() {
    this.getAllActivities();
  }

  getAllActivities(){
    this.activitiesService.getActivities().subscribe(res => {
      this.activitiesData = res;
    })

    this.activities = this.activitiesService.readonlyactivitiesModel;
    this.activitiesService.getAllActivitesSubject();

  }

  deleteActivity(activityId: number){
    this.activitiesService.deleteActivity(activityId).subscribe(
      () => {
        console.log("successfuly deleted")
        this.getAllActivities()
      });
      
  }

  //  19/8/2016
  onSelect(selectedActivity: object) {
    this.activitiesService.setActivitySubject(selectedActivity);
}

}
