import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Activities } from 'app/model/activities.model';

@Component({
  selector: 'app-activity-selector',
  templateUrl: './activity-selector.component.html',
  styleUrls: ['./activity-selector.component.scss']
})
export class ActivitySelectorComponent implements OnInit {

  activities: Activities[];
  selectedObject: Activities;

  @Output()
  activitiesOut = new EventEmitter<Activities>();

  constructor() { }

  ngOnInit(): void {

  }

  @Input()
  set passActivities(activities: Activities[]){
    this.activities = activities;
    this.activitiesOut.emit(activities[0]);
    console.log(activities);
  }

  public selectActivity(){
    this.activitiesOut.emit(this.selectedObject);
  }

}
