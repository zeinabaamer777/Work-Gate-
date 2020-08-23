import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router ,ActivatedRoute, Params} from '@angular/router';
import { UsersService } from '../../services/users.service';


@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {
  id: any;
  userData:any;
  viewUser: any;

  constructor(private route: ActivatedRoute, private user_service: UsersService) { }
 
  ngOnInit() {
    this.getUsers();
  }
  getUsers() : void{
    this.id = this.route.snapshot.paramMap.get("id");
    console.log(this.id);
    this.user_service.getUsers().subscribe(res => {
        this.userData = res;
        this.viewUser = this.userData.data.filter(element => element.id == this.id)[0];
        console.log(this.viewUser);
    });
  }
}
