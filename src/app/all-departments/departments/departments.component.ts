import { Component, OnInit } from '@angular/core';
import { DepartmentsService } from '../../../services/departments.service';
import { Departments } from 'app/model/departments.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {
  searchText: string;
  departmentsList: any;
  departmentNew: any;
  // companyData: any;

  departmentsData: Departments[];
  departments: Observable<Departments[]>;

  constructor(private departmentsService: DepartmentsService) { }

  ngOnInit() {
    this.getAllDepartments();
  }

  getAllDepartments() {

    this.departments = this.departmentsService.readonlyDepartmentsModel;
    this.departmentsService.getAlldepartmentsSubject();

  }

  deleteDepartment(DepartmentId: number) {
    this.departmentsService.deleteDepartment(DepartmentId).subscribe(
      () => {
        console.log("successfuly deleted")
        this.getAllDepartments()
      });

  }

  //  19/8/2016
  onSelect(selectedDepartment: object) {
    this.departmentsService.setDepartmentSubject(selectedDepartment);
  }


}
