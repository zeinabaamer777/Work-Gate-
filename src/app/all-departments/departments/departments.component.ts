import { Component, OnInit, ɵConsole } from '@angular/core';
import { DepartmentsService } from '../../../services/departments.service';
import { Departments } from '../../../models/departments.model';
import { Observable } from 'rxjs';
import { Company } from '../../../models/companies.model';


@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {
  searchText: string;
  departmentsData: Departments[];
  departments: Observable<Departments[]>;
  //  Company list from company model
  companiesList: Observable<Company[]>;

  constructor(private departmentsService: DepartmentsService) { }

  ngOnInit() {
    this.getAllDepartments();
  }

  getAllDepartments() {

    this.departments = this.departmentsService.readonlyDepartmentsModel;
    this.departmentsService.getAlldepartmentsSubject();
    console.log(this.departments);

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
