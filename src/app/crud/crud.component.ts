import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm, EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivitiesService } from '../../services/activities.service';
import { Activities } from 'app/model/activities.model';

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
  constructor(
    public fb: FormBuilder,
    private router: Router,
    public ActivitiesService: ActivitiesService
  ) { }


  ngOnInit(): void {
    this.isHiddenSaveActionBtn = true;
    this.isHiddenSaveCreateBtn = true;
    this.isHiddenEditActionBtn = true;
    this.isHiddenCreateActionBtn = false;
    this.isHiddenActivityId =  true;
    this.activityForm = this.fb.group({
      activityId: new FormControl({value: ''}),
      enName: new FormControl({ value: '', disabled: true }, [Validators.required]),
      arName: new FormControl({ value: '', disabled: true }, [Validators.required]),
      centralAdminArName: new FormControl({ value: '', disabled: true }, [Validators.required]),
      centeralAdminEnName: new FormControl({ value: '', disabled: true }, [Validators.required]),
    });

    this.printDataToForm();

  }
  //#region 0 printDataToForm to print data on clcik on each td on the table
  printDataToForm() {
    this.ActivitiesService.getActivitySubject().subscribe(res => {
      this.isHiddenCreateActionBtn = true;
      this.isHiddenEditActionBtn = false;
      this.activityId = res.activityId;
      this.activityObject = res;
      this.activityForm = this.fb.group({
        activityId: new FormControl({ value: res.activityId }),
        enName: new FormControl({ value: res.enName, disabled: true }, [Validators.required]),
        arName: new FormControl({ value: res.arName, disabled: true }, [Validators.required]),
        centralAdminArName: new FormControl({ value: res.centralAdminArName, disabled: true }, [Validators.required]),
        centeralAdminEnName: new FormControl({ value: res.centeralAdminEnName, disabled: true }, [Validators.required]),

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

  //#region updateRecord() method to update data of the row in table
  updateRecord() {
    const data = JSON.stringify(this.activityForm.value);
    const activeit: any = JSON.parse(data);
    this.active = new Activities();
    this.active.activityId = activeit.activityId.value;
    this.active.arName = activeit.arName;
    this.active.centeralAdminEnName = activeit.centeralAdminEnName;
    this.active.centralAdminArName = activeit.centralAdminArName;
    this.active.enName = activeit.enName;

    this.ActivitiesService.updateActivity(this.activityObject.activityId, this.active)
    // this.ActivitiesService.updateActivity(this.activityObject.activityId, this.activityForm.value)
  }
  //#endregion

  createActivity() {
    // this.isDisabled = false;
    // if(this.isSave){
    this.ActivitiesService.createActivities(this.activityForm.value);
    this.activityForm.enable();
    this.activityForm.reset();
  }

  //#region reset() method
  onReset() {
    this.isHiddenSaveActionBtn = true;
    this.isHiddenSaveCreateBtn = true;
    this.isHiddenEditActionBtn = true;
    this.isHiddenCreateActionBtn = false;
    this.activityForm.reset();
    this.activityForm.disable();
  }


}
