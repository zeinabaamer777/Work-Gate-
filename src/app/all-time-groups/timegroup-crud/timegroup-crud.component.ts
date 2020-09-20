import { TimeGroupsService } from './../../../services/timegroup.service';
import { timeGroups } from 'models/timeGroups.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidationService } from 'app/validators/CustomvalidationService.validator';

@Component({
  selector: 'app-timegroup-crud',
  templateUrl: './timegroup-crud.component.html',
  styleUrls: ['./timegroup-crud.component.scss']
})
export class TimegroupCrudComponent implements OnInit {

  timeGroupsForm: FormGroup;
  timeGroupsObject: timeGroups;
  isHiddenSaveActionBtn: boolean;
  isDisabled: boolean;
  // isHiddenActionBtn: boolean;
  timeGroupId: number;
  isHiddenSaveCreateBtn: boolean;
  isHiddenEditActionBtn: boolean;
  isHiddenCreateActionBtn: boolean;
  isSave: boolean;
  active: timeGroups;
  isHiddenActivityId: boolean;


  constructor(
    public fb: FormBuilder,
    public TimeGroupsService: TimeGroupsService,
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
    this.timeGroupsForm = this.fb.group({
      timeGroupId: [0],
      timeFrom: new FormControl({ value: '', disabled: true }, [Validators.required]),
      timeTo: new FormControl({ value: '', disabled: true }, [Validators.required]),
      flexibleHours: new FormControl({ value: '', disabled: true },  [Validators.required]),
    });
  }
  
  //#region 0 printDataToForm to print data on clcik on each td on the table
  printDataToForm() {
    this.TimeGroupsService.getTimeSubject().subscribe(res => {
      this.isHiddenCreateActionBtn = true;
      this.isHiddenEditActionBtn = false;
      this.timeGroupsObject = res;
      this.timeGroupId = res.id;

      console.log(this.timeGroupId);

      this.timeGroupsForm = this.fb.group({
        timeGroupId: new FormControl({ value: res.id,disabled: true }),
        timeFrom: new FormControl({ value: res.timeFrom, disabled: true }, [Validators.required]),

        timeTo: new FormControl({ value: res.timeTo, disabled: true },
           [Validators.required]),

           flexibleHours: new FormControl({ value: res.flexibleHours, disabled: true },
           [Validators.required]),

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
    this.timeGroupsForm.enable();
  }
  //#endregion

  //#region showBtns() method to show save and cancel btns on click on update btn
  showCreateSaveBtn() {
    // this.isDisabled = true;
    this.isHiddenSaveCreateBtn = false;
    this.isHiddenSaveActionBtn = true;
    this.isHiddenEditActionBtn = true;
    this.timeGroupsForm.enable();
  }
  //#endregion
//#region  update and create form in the same method
  onSubmit(model: timeGroups){
    debugger
    //create
    if(model.id == 0){
      console.log(model);
      this.TimeGroupsService.createTimeGroup(model);
      this.timeGroupsForm.reset();
      this.onReset();
      this.timeGroupsForm.controls['timeGroupId'].setValue(0);
    }
    //edit
    else{
      console.log(model);
      this.TimeGroupsService.updateTimeGroup(model.id, this.timeGroupsForm.value);
      this.timeGroupsForm.reset();
      this.onReset();
      this.timeGroupsForm.controls['timeGroupId'].setValue(0);
    }
  }

  //#region onReset() method - fires on cancel
  onReset() {
    this.isHiddenSaveActionBtn = true;
    this.isHiddenSaveCreateBtn = true;
    this.isHiddenEditActionBtn = true;
    this.isHiddenCreateActionBtn = false;
    this.timeGroupsForm.controls['timeGroupId'].setValue('');
    // this.timeGroupsForm.reset();
    this.timeGroupsForm.disable();
  }

}
