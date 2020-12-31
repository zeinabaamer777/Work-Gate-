
import { Division } from 'core/models/division.model';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DivisionsService } from 'core/services/divisions.service';
import { Departments } from 'core/models/departments.model';
import { Company } from 'core/models/companies.model';
import { Activities } from 'core/models/activities.model';
import { Observable } from 'rxjs';
import { DepartmentsService } from 'core/services/departments.service';
import { CompaniesService } from 'core/services/companies.service';
import { ActivitiesService } from 'core/services/activities.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-divisions-crud',
  templateUrl: './divisions-crud.component.html',
  styleUrls: ['./divisions-crud.component.scss']
})
export class DivisionsCrudComponent implements OnInit {

  activities: Observable<Activities[]>;
  companies: Observable<Company[]>;
  departments: Observable<Departments[]>;


  divisionForm: FormGroup;
  division: Division;

  isHiddenEditActionBtn: boolean;
  isHiddenCreateActionBtn: boolean;
  isHiddenSaveCreateBtn: boolean;
  isHiddenSaveActionBtn: boolean;
  isEdit: boolean;

  activity: Activities;
  company: Company;
  department: Departments;


  constructor(
    public fb: FormBuilder,
    private divisionService: DivisionsService,
    private departmentService: DepartmentsService,
    private companyService: CompaniesService,
    private activitiesService: ActivitiesService
  ) { }

  ngOnInit(): void {

    this.loadDepartments();
    this.loadCompanies();
    this.loadActivities();

    this.initButtons();
    this.initForm();
  }

  initButtons() {
    this.isHiddenCreateActionBtn = false;
    this.isHiddenEditActionBtn = true;
    this.isHiddenSaveActionBtn = true;
    this.isHiddenSaveCreateBtn = true;
  }

  initForm() {
    this.divisionForm = this.fb.group({
      activity: new FormControl({ value: '', disabled: true }, [Validators.required]),
      company: new FormControl({ value: '', disabled: true }, [Validators.required]),
      department: new FormControl({ value: '', disabled: true }, [Validators.required]),
      enName: new FormControl({ value: '', disabled: true }, [Validators.required]),
      arName: new FormControl({ value: '', disabled: true }, [Validators.required]),
    });
  }

  showBtns(): void {
    this.divisionForm.enable();
    this.isHiddenSaveActionBtn = false;
  }

  showCreateSaveBtn(): void {
    this.divisionForm.enable();
    this.divisionForm.reset();

    this.isHiddenSaveCreateBtn = false;
    this.isHiddenCreateActionBtn = true;

  }

  onSubmit(model: any): void {

    console.log(model);

    const division = new Division();
    division.arName = model.arName;
    division.enName = model.enName;
    division.departmentId = model.department.departmentId;
    division.divisionId = 0;
  
    this.divisionService.createDivision(division);
    this.Cancel();

  }

  Cancel(): void {
    this.isHiddenSaveCreateBtn = true;
    this.isHiddenCreateActionBtn = false;
    this.divisionForm.disable();
    this.divisionForm.reset();
    this.isHiddenSaveActionBtn = true;
  }

  updatePosition(model: any): void {
    console.log(model);

    const division = new Division();
    division.arName = model.arName;
    division.enName = model.enName;
    division.departmentId = model.department.departmentId;
    division.divisionId = this.division.divisionId;

    this.divisionService.updateDivision(division.divisionId,division);
    this.Cancel();
    
  }

  loadDepartments(): void {
    this.departments = this.departmentService.readonlyDepartmentsModel;
    this.departmentService.getAlldepartmentsSubject();
  }

  loadCompanies(): void {
    this.companies = this.companyService.readonlyactivitiesModel;
    this.companyService.getCompanies();
  }

  loadActivities(): void {
    this.activities = this.activitiesService.readonlyactivitiesModel;
    this.activitiesService.getAllActivitesSubject();
  }

  @Input()
  set divisionObject(division: Division) {

    this.isHiddenEditActionBtn = false;
    // this.companyForm.disable();
    // this.companyForm.disable();
    this.division = division;

    if (division !== undefined) {
      this.division = division;
      console.log(this.company);

      this.divisionForm = this.fb.group({
        activity: new FormControl({ value: '0', disabled: true }),
        company: new FormControl({ value: '0', disabled: true }),
        department: new FormControl({ value: '0', disabled: true }),
        enName: new FormControl({ value: this.division.arName, disabled: true }, [Validators.required]),
        arName: new FormControl({ value: this.division.enName, disabled: true }, [Validators.required]),

      });

      this.activities = this.activitiesService.readonlyactivitiesModel;

      this.companies = this.companyService.readonlyactivitiesModel;
      this.departments = this.departmentService.readonlyDepartmentsModel;



      this.departments.subscribe(dataD => {

        
        const department = dataD.find(x => x.departmentId === this.division.departmentId);

        this.departments = this.departments.pipe(map(filter => filter.filter(x => x.companyID === department.companyID)));

        this.divisionForm.controls['department'].setValue(department, { onlySelf: true });

        this.companies.subscribe(dataC => {

          const company = dataC.find(x => x.id === department.companyID);
          this.divisionForm.controls['company'].setValue(company, { onlySelf: true });

          this.companies = this.companies.pipe(map(filter => filter.filter(x => x.activityId === company.activityId)))

          this.activities.subscribe(dataA => {
            console.log(company.activityId);
            const activity = dataA.find(x => x.activityId === company.activityId);
            console.log(activity);
            this.divisionForm.controls['activity'].setValue(activity, { onlySelf: true });
          });
        });
      });
    }

  }

  selectActivity($event){
    console.log($event.value);

    this.activity = $event.value;

    this.companies = this.companyService.readonlyactivitiesModel;

    this.companies = this.companies.pipe(map(filter => 
      filter.filter(x => x.activityId === $event.value.activityId)));

  }

  selectCompany($event){

    this.company = $event.value;

    this.departments = this.departmentService.readonlyDepartmentsModel;
    this.departments = this.departments.pipe(map(filter => filter.filter(x => x.companyID === this.company.id)));
    
  }

  selectDepartment($event){
    this.department = $event.value;
  }



}

