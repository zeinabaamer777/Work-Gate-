import { createPlace } from './../../../models/Request/createPlcae.model';
import { Places } from './../../../models/places.model';
import { Component, OnInit } from '@angular/core';
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

  placesCreateObjetc: createPlace;
  isHiddenSaveActionBtn: boolean;
  isDisabled: boolean;
  // isHiddenActionBtn: boolean;
  placeId: number;
  isHiddenSaveCreateBtn: boolean;
  isHiddenEditActionBtn: boolean;
  isHiddenCreateActionBtn: boolean;
  isHiddendepartmentId: boolean;
  isCreate: boolean;
  newPlaces: Place[];

  constructor(
    private fb: FormBuilder,
    private fb2: FormBuilder,
    private placesService: PlacesService,
    private notifyService : NotificationService,
    private toastr : ToastrService
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
    this.isHiddenCreateActionBtn = false;
    this.isHiddendepartmentId =  true;
    this.placesForm = this.fb.group({
      placeId: [0],
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
      this.placesCreateObjetc = res;
      this.placeId = res.id;

      console.log("place id *id in API*" , this.placeId);
      console.log("department Object", this.placesCreateObjetc);

      this.placesForm = this.fb.group({
        placeId: new FormControl({ value: res.id,disabled: true }),
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
    this.isHiddenCreateActionBtn = true;
    this.isHiddenSaveCreateBtn = true;
    this.placesForm.enable();

  }
  //#endregion

  //#region showBtns() method to show save and cancel btns on click on Create btn
  showCreateSaveBtn() {
    // this.isDisabled = true;
    this.isHiddenSaveCreateBtn = false;
    this.isHiddenSaveActionBtn = true;
    this.isHiddenEditActionBtn = true;
    this.placesForm.reset();
    this.placesForm.enable();
  }
  //#endregion


//#region  update and create form in the same method
//#region  update and create form in the same method
onSubmit(model: any){

  debugger
  //create
  const place = new createPlace();
  place.id = model.placeId;
  place.placeNameAr = model.placeArName;
  place.placeNameEn = model.placeEnName;
  place.code = model.placeCode;
// Update
  if(!this.isCreate && model){
    console.log(place);
    place.id = model.placeId;
    this.placesService.updatePlace(place.id, place);
    this.placesService.getPlaceSubject();
    // Toaster Notification
    this.notifyService.showSuccess("updated successfully","update department");
    
    this.placesForm.reset();
    this.onReset();
    this.placesForm.controls['placeId'].setValue(0);
    this.isCreate = false;

  }
  // Insert
  else{
    console.log(place);
    place.id = 0;
    this.placesService.createPlace(place);
      // Toaster Notification
    this.notifyService.showSuccess("Created successfuly", "Create department");

    this.placesForm.reset();
    this.onReset();
    this.placesForm.controls['placeId'].setValue(0);
    this.isCreate = false;
  }
}

  //#region onReset() method - fires on cancel
  onReset() {
    this.isHiddenSaveActionBtn = true;
    this.isHiddenSaveCreateBtn = true;
    this.isHiddenEditActionBtn = true;
    this.isHiddenCreateActionBtn = false;
    this.placesForm.controls['placeId'].setValue('');
    // this.departmentForm.reset();
    this.placesForm.disable();
  }

}
