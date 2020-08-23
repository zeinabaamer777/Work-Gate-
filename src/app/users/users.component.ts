import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { UserSiteGroupsService } from '../../services/user-site-groups.service';
import { TimeGroupsService } from '../..//services/timegroup.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  // input and output area declaration
  @Output() userDetails : EventEmitter<any> = new EventEmitter<any>();
  @Output() zzid : EventEmitter<any> = new EventEmitter<any>();
  @Output() siteTimeGroupData : EventEmitter<any> = new EventEmitter<any>();


  webApiEndPont : string;
  searchText:string;
  usersList: any;
  userData: any;
  p: number; // p for paination to solve that error - Property 'p' does not exist on type 'VideosComponent'.
  userSiteObject: any;
  userSiteByIdFromGroups: any;
  siteUserResposibilities: any;
  timegroupData: any;
  companyByIdFromSites: any;

  ///// activateClass //////
  selectedIndex: number = null;
  setIndex(index: number) {
      this.selectedIndex = index;
  }

  //  end active 
  constructor(private usersService: UsersService, private userSiteGroupService: UserSiteGroupsService ) { }

  ngOnInit() {
    this.getUsers();

      //this.usersService.sharedUser.subscribe(user => this.userData = user)
  }

  getUsers() {
    this.usersService
    .getUsers()
    .subscribe(lists => {
        this.usersList= lists;
        this.userData = this.usersList.data;
        console.log("user data", this.userData);
    });
  }

  // event emitter
  goToUserDetails(user) {
    this.usersService.setDate();
    this.userDetails.emit(user.siteUserResposibilities);
    this.userSiteGroupService
      .getUserSiteGroups(user.id)
      .subscribe(res => {
        this.userSiteObject = res;
        //debugger;
        this.siteTimeGroupData.emit(this.userSiteObject.data);
        
      });
      //comment
      this.zzid.emit(user.id);
  }
}
