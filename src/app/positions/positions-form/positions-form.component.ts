import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PositionsService } from 'services/positions.service';
import { Position } from '../../../models/Response/position.model'
import { CreatePositionModel } from '../../../models/Request/Position/createPosition.model';
import { ActivitiesService } from 'services/activities.service';
import { Observable } from 'rxjs';
import { Activities } from '../../../models/activities.model';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss']
})
export class PositionsFormComponent implements OnInit {

  positionForm: FormGroup;

  isHiddenEditActionBtn: boolean;
  isHiddenCreateActionBtn: boolean;
  isHiddenSaveCreateBtn: boolean;
  isHiddenSaveActionBtn: boolean;

  activities: Observable<Activities[]>;
  
  

  position: Position;

  @Output() searchText = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder,
    private activityService: ActivitiesService,
    private positionService: PositionsService
  ) { }

  ngOnInit(): void {
    
    this.initForm();
    this.initButtons();
    this.loadActivities();

  }

  private loadActivities(): void{
    this.activities = this.activityService.readonlyactivitiesModel;
    this.activityService.getAllActivitesSubject();
  }

  selectedActivity(activity: Activities){
    console.log(activity);
  }


  initButtons(){
    this.isHiddenCreateActionBtn = false;
    this.isHiddenEditActionBtn = true;
    this.isHiddenSaveActionBtn = true;
    this.isHiddenSaveCreateBtn = true;
  }

  initForm(){
    this.positionForm = this.fb.group({
      positionId: new FormControl({value: '0'}),
      positionNameAr: new FormControl({ value: '', disabled: true }, [Validators.required]),
      positionNameEn: new FormControl({ value: '', disabled: true }, [Validators.required]),
    });
  }

  @Input()
  set PositionObject(position: Position){
    if(position === null || position === undefined){
      return;
    }
    
    this.position = position;

    this.PassDataToForm(position);

    this.isHiddenEditActionBtn = false;
  }

  private PassDataToForm(position: Position) {

    this.position = null;
    
    this.Cancel();

    this.position = position;

    this.positionForm = this.fb.group({
      positionId: new FormControl({ value: position.positionId }),
      positionNameAr: new FormControl({ value: position.positionNameAr, disabled: true }, [Validators.required]),
      positionNameEn: new FormControl({ value: position.positionNameEn, disabled: true }, [Validators.required]),
    });
  }

  Cancel(){
    if(this.position !== null){
      this.PassDataToForm(this.position);
      this.isHiddenEditActionBtn = false;
      this.isHiddenSaveActionBtn = true;
    }
    else
    {
      this.isHiddenSaveActionBtn = true;
      this.isHiddenEditActionBtn = true;
      this.isHiddenSaveCreateBtn = true;
      this.searchText.emit("");

    }

    this.positionForm.disable();


  }

  updatePosition(){


    if(this.positionForm.valid){
      const data = JSON.stringify(this.positionForm.value);
      const positionData: any = JSON.parse(data);
      const position = new Position();
      position.positionId = positionData.positionId.value;
      position.positionNameAr = positionData.positionNameAr;
      position.positionNameEn = positionData.positionNameEn;
      this.positionService.updatePosition(position.positionId, position);
      this.position = position;
      this.Cancel();
    }
  }

  createPosition(){


    if(this.positionForm.valid){
      const data = JSON.stringify(this.positionForm.value);
      const positionData: any = JSON.parse(data);
      const position = new CreatePositionModel();
      position.positionNameAr = positionData.positionNameAr;
      position.positionNameEn = positionData.positionNameEn;
      this.positionService.createPosition(position);
      this.position = null;
      this.Cancel();
    }
  }

  showBtns(){
    this.positionForm.enable();
    this.isHiddenSaveActionBtn = false;
    this.isHiddenEditActionBtn = true;
  }

  showCreateSaveBtn(){
    this.position = null;

    this.positionForm.reset();
    this.positionForm.enable();

    this.isHiddenEditActionBtn = true;
    this.isHiddenSaveCreateBtn = false;
  }

}
