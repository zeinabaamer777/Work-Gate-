import { DatePipe } from '@angular/common';
import { NotificationDialogService } from './../../../core/services/notificationDialog.service';
import { DialogService } from './../../../core/services/dialog.service';
import { TimeGroupsService } from '../../../core/services/timegroup.service';
import { timeGroups } from 'core/models/timeGroups.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidationService } from 'core/validators/CustomvalidationService.validator';
import { TimePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { FormValidator, FormValidatorModel } from '@syncfusion/ej2-inputs';;
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';

@Component({
  selector: 'app-timegroup-crud',
  templateUrl: './timegroup-crud.component.html',
  styleUrls: ['./timegroup-crud.component.scss']
})
export class TimegroupCrudComponent implements OnInit {
  @ViewChild('input') private checkInput;

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
  flexibleHours: number;

  datatime: string;
  timeFromFormatter: any;
  public weekDays = ['Saturday', 'Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  constructor(
    public fb: FormBuilder,
    public TimeGroupsService: TimeGroupsService,
    private customValidator: CustomValidationService,
    private dialogService: DialogService,
    private notificationDialogService: NotificationDialogService,
    private datePipe: DatePipe

  ) { }

  ngOnInit(): void {
    this.isReadonly = true;
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
      timeGroupName: new FormControl ( { value: '' , disabled: true}, [Validators.required] ),
      timeFrom: new FormControl({ value: '', disabled: true }, [Validators.required]),
      timeTo: new FormControl({ value: '', disabled: true }, [Validators.required]),
      fromDayOfWeek: new FormControl( {value: '', disabled: true }, [Validators.required]),
      toDayOfWeek: new FormControl({ value: '', disabled: true }, [Validators.required]),
      hasFlexibleHours: new FormControl({value: '', disabled: true}),
      flexibleHours: new FormControl({ value: '', disabled: true },  [Validators.pattern("^[0-9]*$")]),
    });
  }
  
  //#region 0 printDataToForm to print data on clcik on each td on the table
  printDataToForm() {
    
    
    this.TimeGroupsService.getTimeSubject().subscribe(res => {
      this.isHiddenCreateActionBtn = true;
      this.isHiddenEditActionBtn = false;
      this.timeGroupsObject = res;
      this.timeGroupId = res.id;
      this.flexibleHours = res.flexibleHours;
      // this.startDate = new Date(res.timeFrom);
      console.log("timeGroupId from print data to form method" , this.timeGroupId);
      // console.log("timeGroup flexible from print data to form method" , this.flexibleHours);


// res.timeFrom.split('T')[1]
// this.datePipe.transform(res.timeFrom, 'h:mm a')

        this.timeGroupsForm = this.fb.group({
        timeGroupId: new FormControl({ value: res.id,disabled: true }),

        timeGroupName: new FormControl ( { value: res.timeGroupName , disabled: true}, [Validators.required] ),

        timeFrom: new FormControl({ value: this.datePipe.transform(res.timeFrom, 'HH:mm') , disabled: true }, [Validators.required]),

        timeTo: new FormControl({ value: this.datePipe.transform(res.timeTo.toString(), 'HH:mm'), disabled: true }, [Validators.required]),

        fromDayOfWeek: new FormControl( {value: res.fromDayOfWeek, disabled: true }, [Validators.required]),

        toDayOfWeek: new FormControl({ value: res.toDayOfWeek, disabled: true }, [Validators.required]),

        hasFlexibleHours: new FormControl({value: res.hasFlexibleHours, disabled: true}),

        flexibleHours: new FormControl({ value: res.flexibleHours, disabled: true }),

      });

      // this.datatime = res.timeFrom.split('T')[1];
      debugger

      //#region check If flexibleHours has value or not,
      // if has Value? readonly will disabled
      // if not has a value? readonly will enabled untill change the checkbox input using switch() method
   
      if(this.timeGroupsForm.get('flexibleHours').value != null) {
        this.isReadonly = false;
        
      }
      if(this.timeGroupsForm.get('flexibleHours').value == null) {
        this.isReadonly = true;
        alert("readonly true")
      }
      //#endregion

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
    this.isHiddenCreateActionBtn = true;
    this.timeGroupsForm.enable();
  }
  //#endregion
//#region  create form
  createTime(model: any){
    debugger
    //create
      console.log(model.id)
      console.log(model);
      
      const timeGroupInstance = new timeGroups();
     
      timeGroupInstance.timeGroupName = model.timeGroupName;
      timeGroupInstance.hasFlexibleHours = model.hasFlexibleHours;
      timeGroupInstance.flexibleHours  = model.flexibleHours;
      timeGroupInstance.timeFrom = model.timeFrom;
      timeGroupInstance.timeTo = model.timeTo;
      timeGroupInstance.fromDayOfWeek = model.fromDayOfWeek;
      timeGroupInstance.toDayOfWeek = model.toDayOfWeek;
      timeGroupInstance.id = 0;

      this.TimeGroupsService.createTimeGroup(timeGroupInstance);
      this.timeGroupsForm.reset();
      this.onReset();
      this.timeGroupsForm.controls['timeGroupId'].setValue(0);
      this.notificationDialogService.success('Created successfully!');

      
  }
  //#endregion

  //#region  update form

  updateTime(model: any){
    const timeGroupInstance = new timeGroups();
   

    timeGroupInstance.timeGroupName = model.timeGroupName;
    timeGroupInstance.hasFlexibleHours = model.hasFlexibleHours;
    timeGroupInstance.flexibleHours  = model.flexibleHours;
    timeGroupInstance.timeFrom = model.timeFrom;
    timeGroupInstance.timeTo = model.timeTo;
    timeGroupInstance.fromDayOfWeek = model.fromDayOfWeek;
    timeGroupInstance.toDayOfWeek = model.toDayOfWeek;
    timeGroupInstance.id = this.timeGroupsObject.id;
    this.TimeGroupsService.updateTimeGroup(timeGroupInstance);
    this.timeGroupsForm.reset();
    this.onReset();
    this.timeGroupsForm.controls['timeGroupId'].setValue(0);
    this.notificationDialogService.success('Updated successfully!');
        
 }
 //#endregion
  //#region onReset() method - fires on cancel
  onReset() {
    this.isHiddenSaveActionBtn = true;
    this.isHiddenSaveCreateBtn = true;
    this.isHiddenEditActionBtn = true;
    this.isHiddenCreateActionBtn = false;
    this.timeGroupsForm.controls['timeGroupId'].setValue('');
    // 
    this.timeGroupsForm.disable();
    this.timeGroupsForm.reset();
    this.timeGroupsObject = null;
  }
  //#endregion

  //#region  selectDay() method to fire select_option with week day options
  selectDay(event: any){
    console.log(event.value);
  }
  //#region 

//#region checkbox
  // if checked and has a value, the value will gone and readonly will be enabled
  // if checked and has no value, the readonly will be disabled and the admin will be able to add a value

// isReadonly = true;
isReadonly: boolean;
switchFlexibleHours(event){
  debugger
  
  if ( event.target.checked && this.timeGroupsForm.get('flexibleHours').value != null) {
    alert("checked");
    this.isReadonly = false
  }
  else if(event.target.checked && this.timeGroupsForm.get('flexibleHours').value == null) {
    this.isReadonly = false;
  }
  else {
    alert("unchecked");
    this.timeGroupsForm.get('flexibleHours').setValue("");
    this.isReadonly = true;
  }
}

//#endregion

}
