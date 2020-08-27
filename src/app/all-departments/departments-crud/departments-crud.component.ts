import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm, EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartmentsService } from '../../../services/departments.service';
import { Departments } from 'app/model/departments.model';
import { CompaniesService } from 'services/companies.service';
import { Observable } from 'rxjs';
import { Company } from 'app/model/Response/company.model';

@Component({
  selector: 'app-departments-crud',
  templateUrl: './departments-crud.component.html',
  styleUrls: ['./departments-crud.component.scss']
})
export class DepartmentsCrudComponent implements OnInit {

  departmentForm: FormGroup;
  departmentObject: Departments;
  isHiddenSaveActionBtn: boolean;
  isDisabled: boolean;
  // isHiddenActionBtn: boolean;
  departmentId: number;
  isHiddenSaveCreateBtn: boolean;
  isHiddenEditActionBtn: boolean;
  isHiddenCreateActionBtn: boolean;
  isHiddendepartmentId: boolean;

  companies: Observable<Company[]>;

  constructor(
    private fb: FormBuilder,
    private fb2: FormBuilder,
    private DepartmentsService: DepartmentsService,
    private companiesService: CompaniesService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.printDataToForm();
    this.loadComanpies();

  }

  loadComanpies(){
    this.companies = this.companiesService.readonlyactivitiesModel;
    this.companiesService.getCompanies();
    console.log(this.companies);
  }

  initForm(){
    this.isHiddenSaveActionBtn = true;
    this.isHiddenSaveCreateBtn = true;
    this.isHiddenEditActionBtn = true;
    this.isHiddenCreateActionBtn = false;
    this.isHiddendepartmentId =  true;
    this.departmentForm = this.fb.group({
      departmentId: [0],
      companyId: [0],
      departmentEnName: new FormControl({ value: '', disabled: true }, [Validators.required]),
      departmentArName: new FormControl({ value: '', disabled: true }, [Validators.required]),
    });
  }
  //#region 0 printDataToForm to print data on clcik on each td on the table
  printDataToForm() {
    this.DepartmentsService.getDepartmentSubject().subscribe(res => {
      this.isHiddenCreateActionBtn = true;
      this.isHiddenEditActionBtn = false;
      this.departmentObject = res;
      this.departmentId = res.departmentId;

      console.log(this.departmentId);
      console.log("department Object", this.departmentObject);

      this.departmentForm = this.fb.group({
        departmentId: new FormControl({ value: res.departmentId,disabled: true }),
        companyId: new FormControl({ value: res.companyID,disabled: true }),
        departmentEnName: new FormControl({ value: res.enName, disabled: true }, [Validators.required]),
        departmentArName: new FormControl({ value: res.arName, disabled: true }, [Validators.required])

      });

    });
  }
  //#endregion
  //#region showBtns() method to show save and cancel btns on click on update btn
  showBtns() {
    // this.isDisabled = true;
    this.isHiddenSaveActionBtn = false;
    this.isHiddenCreateActionBtn = true;
    this.isHiddenSaveCreateBtn = true;
    this.departmentForm.enable();
  }
  //#endregion

  //#region showBtns() method to show save and cancel btns on click on update btn
  showCreateSaveBtn() {
    // this.isDisabled = true;
    this.isHiddenSaveCreateBtn = false;
    this.isHiddenSaveActionBtn = true;
    this.isHiddenEditActionBtn = true;
    this.departmentForm.enable();
  }
  //#endregion


//#region  update and create form in the same method
  onSubmit(model: Departments){
    debugger
    //create
    if(model.departmentId == 0){
      console.log(model);
      this.DepartmentsService.createDepartments(model);
      this.departmentForm.reset();
      this.onReset();
      this.departmentForm.controls['departmentId'].setValue(0);
      this.departmentForm.controls['companyID'].setValue(0);
    }
    //edit
    else{
      console.log(model);
      this.DepartmentsService.updateDepartment(model.departmentId, this.departmentForm.value);
      this.departmentForm.reset();
      this.onReset();
      this.departmentForm.controls['departmentId'].setValue(0);
      this.departmentForm.controls['companyID'].setValue(0);
    }
  }

  //#region onReset() method - fires on cancel
  onReset() {
    this.isHiddenSaveActionBtn = true;
    this.isHiddenSaveCreateBtn = true;
    this.isHiddenEditActionBtn = true;
    this.isHiddenCreateActionBtn = false;
    this.departmentForm.controls['departmentId'].setValue('');
    this.departmentForm.controls['companyID'].setValue('');
    // this.departmentForm.reset();
    this.departmentForm.disable();
  }

}



