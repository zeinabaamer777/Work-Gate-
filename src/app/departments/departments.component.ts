import { Component, OnInit } from '@angular/core';
import { DepartmentsService } from '../../services/departments.service';


@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {
  searchText:string;
  departmentsList: any;
  departmentNew : any;
 // companyData: any;
  constructor(private departments_service: DepartmentsService) { }

  ngOnInit() {
    this.departments_service
    .getDepartments()
    .subscribe(lists => {
        this.departmentsList= lists;
       // this.companyData = this.companiesList.data;

        // console.log(this.departmentsList);
    });
  }

  getdepartment(department){
    this.departmentNew = department;
    // console.log(  this.departmentNew);

  }


}
