import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-list-details',
  templateUrl: './users-list-details.component.html',
  styleUrls: ['./users-list-details.component.scss']
})
export class UsersListDetailsComponent implements OnInit {

  user: any;
  siteTimeGroupData: any;
  id: any;
  constructor() { }

  ngOnInit(): void {
  }
  
  SelectData(data: any){
    this.user = data;
  }

  selectTimeGroup(siteGroupData: any){
    this.siteTimeGroupData = siteGroupData;
  }
  SelcetId(id){
    this.id  = id;
  }

}
