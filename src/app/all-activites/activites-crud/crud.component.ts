import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm, EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivitiesService } from '../../../services/activities.service';
import { Activities } from '../../../models/activities.model';
import { CustomValidationService } from 'app/validators/CustomvalidationService.validator';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {
  activityForm: FormGroup;
  activityObject: Activities;
  isHiddenSaveActionBtn: boolean;
  isDisabled: boolean;
  // isHiddenActionBtn: boolean;
  activityId: number;
  isHiddenSaveCreateBtn: boolean;
  isHiddenEditActionBtn: boolean;
  isHiddenCreateActionBtn: boolean;
  isSave: boolean;
  active: Activities;
  isHiddenActivityId: boolean;
  activityFormTwo: FormGroup;

  constructor(
    public fb: FormBuilder,
    public fb2: FormBuilder,
    public ActivitiesService: ActivitiesService,
    private customValidator: CustomValidationService

  ) { }

  ngOnInit(): void {
    this.initForm();
    this.printDataToForm();

  }
  initForm(){
    this.isHiddenSaveActionBtn = true;
    this.isHiddenSaveCreateBtn = true;
    this.isHiddenEditActionBtn = true;
    this.isHiddenCreateActionBtn = false;
    this.isHiddenActivityId =  true;
    this.activityForm = this.fb.group({
      activityId: [0],
      enName: new FormControl({ value: '', disabled: true }, [Validators.required, this.customValidator.patternEnglishValidator()]),
      arName: new FormControl({ value: '', disabled: true }, [Validators.required, this.customValidator.patternArabicValidator()]),
      centralAdminArName: new FormControl({ value: '', disabled: true },  [Validators.required, this.customValidator.patternArabicValidator()]),
      centeralAdminEnName: new FormControl({ value: '', disabled: true }, [Validators.required, this.customValidator.patternEnglishValidator()]),
    });
  }
  //#region 0 printDataToForm to print data on clcik on each td on the table
  printDataToForm() {
    this.ActivitiesService.getActivitySubject().subscribe(res => {
      this.isHiddenCreateActionBtn = true;
      this.isHiddenEditActionBtn = false;
      this.activityObject = res;
      this.activityId = res.activityId;

      console.log(this.activityId);

      this.activityForm = this.fb.group({
        activityId: new FormControl({ value: res.activityId,disabled: true }),
        enName: new FormControl({ value: res.enName, disabled: true }, [Validators.required, this.customValidator.patternEnglishValidator()]),

        arName: new FormControl({ value: res.arName, disabled: true },
           [Validators.required, this.customValidator.patternArabicValidator()]),

        centralAdminArName: new FormControl({ value: res.centralAdminArName, disabled: true },
           [Validators.required, this.customValidator.patternArabicValidator()]),
        centeralAdminEnName: new FormControl({ value: res.centeralAdminEnName, disabled: true }, [Validators.required,  this.customValidator.patternEnglishValidator()]),

      });

    });
  }
  // ValidateArabic
  //#endregion
  //#region showBtns() method to show save and cancel btns on click on update btn
  showBtns() {
    // this.isDisabled = true;
    this.isHiddenSaveActionBtn = false;
    this.isHiddenCreateActionBtn = true;
    this.isHiddenSaveCreateBtn = true;
    this.activityForm.enable();
  }
  //#endregion

  //#region showBtns() method to show save and cancel btns on click on update btn
  showCreateSaveBtn() {
    // this.isDisabled = true;
    this.isHiddenSaveCreateBtn = false;
    this.isHiddenSaveActionBtn = true;
    this.isHiddenEditActionBtn = true;
    this.activityForm.enable();
  }
  //#endregion
//#region  update and create form in the same method
  onSubmit(model: Activities){
    debugger
    //create
    if(model.activityId == 0){
      console.log(model);
      this.ActivitiesService.createActivities(model);
      this.activityForm.reset();
      this.onReset();
      this.activityForm.controls['activityId'].setValue(0);
    }
    //edit
    else{
      console.log(model);
      this.ActivitiesService.updateActivity(model.activityId, this.activityForm.value);
      this.activityForm.reset();
      this.onReset();
      this.activityForm.controls['activityId'].setValue(0);
    }
  }

  //#region onReset() method - fires on cancel
  onReset() {
    this.isHiddenSaveActionBtn = true;
    this.isHiddenSaveCreateBtn = true;
    this.isHiddenEditActionBtn = true;
    this.isHiddenCreateActionBtn = false;
    this.activityForm.controls['activityId'].setValue('');
    // this.activityForm.reset();
    this.activityForm.disable();
  }
}
