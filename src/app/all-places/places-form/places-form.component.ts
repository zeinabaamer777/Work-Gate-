import { createPlace } from './../../../models/Request/createPlcae.model';
import { Places } from './../../../models/places.model';
import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { PlacesService } from 'services/places.service';
import { NotificationService } from 'app/notification.service';
import { ToastrService } from 'ngx-toastr';
import { Place } from 'models/Response/places.model';
import { MainResponse } from 'models/mainResponse.model';

@Component({
  selector: 'app-places-form',
  templateUrl: './places-form.component.html',
  styleUrls: ['./places-form.component.scss']
})
export class PlacesFormComponent implements OnInit {

  placesForm: FormGroup;
  placeObject: Place;

  placesCreateObjetc: Place;
  isHiddenSaveActionBtn: boolean;
  isDisabled: boolean;
  // isHiddenActionBtn: boolean;
  placeId: number;
  isHiddenSaveCreateBtn: boolean;
  isHiddenEditActionBtn: boolean;
  isHiddenCreateActionBtn: boolean;

  isHiddenCreateGovernmentBtn: boolean;

  isHiddendepartmentId: boolean;
  isCreate: boolean;
  newPlaces: Place[];

  @Output() Reload = new EventEmitter<string>();
 

  constructor(
    private fb: FormBuilder,
    private fb2: FormBuilder,
    private placesService: PlacesService,
    private notifyService : NotificationService,
    private toastr : ToastrService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.printDataToForm();
    this.isCreate = true;
  }

  initForm(){
    this.isHiddenSaveActionBtn = true;
    this.isHiddenSaveCreateBtn = true;
    this.isHiddenEditActionBtn = true;
    this.isHiddenCreateGovernmentBtn = true;
    this.isHiddenCreateActionBtn = false;
    this.isHiddendepartmentId =  true;
    this.placesForm = this.fb.group({
      placeId: [0],
      parentId: [0],

      placeEnName: new FormControl({ value: '', disabled: true }, [Validators.required]),
      placeArName: new FormControl({ value: '', disabled: true }, [Validators.required]),
      placeCode: new FormControl({ value: '', disabled: true }, [Validators.required]),
    });
  }
  //#region 0 printDataToForm to print data on clcik on each td on the table
  printDataToForm() {
    this.placesService.getPlaceSubject().subscribe(res => {
      this.isHiddenCreateActionBtn = true;
      this.isHiddenEditActionBtn = false;
      this.isHiddenCreateGovernmentBtn = false;
      this.placesCreateObjetc = res;
      this.placeId = res.id;

      console.log("place id *id in API*" , this.placeId);
      console.log("department Object", this.placesCreateObjetc);

      this.placesForm = this.fb.group({
        placeId: new FormControl({ value: res.id,disabled: true }),
        parentId: new FormControl({ value: res.parentId,disabled: true }),

        placeEnName: new FormControl({ value: res.placeNameEn, disabled: true }, [Validators.required]),
        placeArName: new FormControl({ value: res.placeNameAr, disabled: true }, [Validators.required]),
        placeCode: new FormControl({ value: res.code, disabled: true }, [Validators.required]),

      });
      this.isCreate = false;

    });
  }
  //#endregion

  //#region showBtns() method to show save and cancel btns on click on update btn
  showBtns() {
    // this.isDisabled = true;
    this.isHiddenSaveActionBtn = false;
    // this.isHiddenCreateActionBtn = true;
    this.isHiddenSaveCreateBtn = true;
    this.placesForm.enable();

  }
  //#endregion

  //#region showCreateSaveBtn()() method to show save and cancel btns on click on Create btn
  showCreateSaveBtn() {
    // this.isDisabled = true;
    this.isHiddenSaveCreateBtn = false;
    this.isHiddenSaveActionBtn = true;
    this.isHiddenEditActionBtn = true;
    this.isHiddenCreateGovernmentBtn = true;
    this.isCreate = true;
    this.placesForm.reset();
    this.placesForm.enable();
  }
  //#endregion


//#region  update and create form in the same method
//#region  update and create form in the same method
onSubmit(model: any){

  debugger
  
  const place = new Place();
  place.id = model.placeId;
  place.parentId  = model.parentId;
  place.placeNameAr = model.placeArName;
  place.placeNameEn = model.placeEnName;
  place.code = model.placeCode;

  if(model.parentId == null){
    place.parentId = 0;
  } else{
    place.parentId = model.parentId;
  }

  // Update
  // if(!this.isCreate && model && model.parentId == null){
  if(!this.isCreate){
    console.log(place);
    place.id = model.placeId;
    this.placesService.updatePlace(place.id, place);
  //  Reload Data

    this.Reload.emit("");
    
    // Toaster Notification
    this.notifyService.showSuccess("updated successfully","update");
    
    this.placesForm.reset();
    this.onCancel();
    this.placesForm.controls['placeId'].setValue(0);
    this.isCreate = false;
    

  }
  // Insert
  else{
    place.id = 0;
    // if(!place.parentId == null){
    //   place.parentId = place.parentId;
    // }
    this.placesService.createPlace(place);
    
    this.Reload.emit("");
      // Toaster Notification
    this.notifyService.showSuccess("Created successfuly", "Create");
    this.placesForm.reset();
    this.onCancel();
    this.placesForm.controls['placeId'].setValue(0);
    this.isCreate = false;
  }
}

  //#region onCancel() method - fires on cancel
  onCancel() {
    this.isHiddenSaveActionBtn = true;
    this.isHiddenSaveCreateBtn = true;
    this.isHiddenEditActionBtn = true;
    this.isHiddenCreateGovernmentBtn = true;
    this.isHiddenCreateActionBtn = false;
    this.placesForm.controls['placeId'].setValue('');
    this.placesForm.disable();
  }

}
