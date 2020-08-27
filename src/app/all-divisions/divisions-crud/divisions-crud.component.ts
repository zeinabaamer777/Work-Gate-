
import { Division } from './../../../models/division.model';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DivisionsService } from 'services/divisions.service';

@Component({
  selector: 'app-divisions-crud',
  templateUrl: './divisions-crud.component.html',
  styleUrls: ['./divisions-crud.component.scss']
})
export class DivisionsCrudComponent implements OnInit {

  divisionForm: FormGroup;

  isHiddenSaveActionBtn: boolean;
  isDisabled: boolean;
  // isHiddenActionBtn: boolean;
  divisionId: number;
  isHiddenSaveCreateBtn: boolean;
  isHiddenEditActionBtn: boolean;
  isHiddenCreateActionBtn: boolean;
  isSave: boolean;
  division: Division;
  isHiddenActivityId: boolean;

  divisionObject: Division;

  constructor(
    public fb: FormBuilder,
    public fb2: FormBuilder,
    public divisionService: DivisionsService
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
    this.divisionForm = this.fb.group({
      divisionId: [0],
      divisionEnName: new FormControl({ value: '', disabled: true }, [Validators.required]),
      divisionArName: new FormControl({ value: '', disabled: true }, [Validators.required]),
    });
  }
  //#region 0 printDataToForm to print data on clcik on each td on the table
  printDataToForm() {
      this.divisionService.getDivisionSubject().subscribe(res => {
      this.isHiddenCreateActionBtn = true;
      this.isHiddenEditActionBtn = false;
      this.divisionObject = res;
      this.divisionId = res.divisionId;

      console.log(this.divisionId);

      this.divisionForm = this.fb.group({
        activityId: new FormControl({ value: res.divisionId,disabled: true }),
        divisionEnName: new FormControl({ value: res.enName, disabled: true }, [Validators.required]),
        divisionArName: new FormControl({ value: res.arName, disabled: true }, [Validators.required]),

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
    this.divisionForm.enable();
  }
  //#endregion

  //#region showBtns() method to show save and cancel btns on click on update btn
  showCreateSaveBtn() {
    // this.isDisabled = true;
    this.isHiddenSaveCreateBtn = false;
    this.isHiddenSaveActionBtn = true;
    this.isHiddenEditActionBtn = true;
    this.divisionForm.enable();
  }
  //#endregion
//#region  update and create form in the same method
  onSubmit(model: Division){
    debugger
    //create
    if(model.divisionId == 0){
      console.log(model);
      this.divisionService.createDivision(model);
      this.divisionForm.reset();
      this.onReset();
      this.divisionForm.controls['divisionId'].setValue(0);
    }
    //edit
    else{
      console.log(model);
      this.divisionService.updateDivision(model.divisionId, this.divisionForm.value);
      this.divisionForm.reset();
      this.onReset();
      this.divisionForm.controls['divisionId'].setValue(0);
    }
  }

  //#region onReset() method - fires on cancel
  onReset() {
    this.isHiddenSaveActionBtn = true;
    this.isHiddenSaveCreateBtn = true;
    this.isHiddenEditActionBtn = true;
    this.isHiddenCreateActionBtn = false;
    this.divisionForm.controls['divisionId'].setValue('');
    // this.activityForm.reset();
    this.divisionForm.disable();
  }
}

