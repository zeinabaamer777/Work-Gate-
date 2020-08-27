import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { Company } from 'app/model/Response/company.model';
import { CompaniesService } from 'services/companies.service';
import { ActivitiesService } from 'services/activities.service';
import { PlacesService } from 'services/places.service';
import { Observable } from 'rxjs';
import { Activities } from 'app/model/activities.model';
import { Place } from 'app/model/Response/place.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-comapny-form',
  templateUrl: './comapny-form.component.html',
  styleUrls: ['./comapny-form.component.scss']
})
export class ComapnyFormComponent implements OnInit {

  company: Company;
  activities: Observable<Activities[]>;
  places: Observable<Place[]>;

  companyForm: FormGroup;

  isHiddenEditActionBtn: boolean;
  isHiddenCreateActionBtn: boolean;
  isHiddenSaveCreateBtn: boolean;
  isHiddenSaveActionBtn: boolean;

  constructor(
    private fb: FormBuilder,
    private companyService: CompaniesService,
    private activityService: ActivitiesService,
    private placeService: PlacesService
    ) { }

  ngOnInit(): void {

    this.loadPlaces();
    this.loadActivities();

    this.initButtons();
    this.initForm();
  }

  initButtons(){
    this.isHiddenCreateActionBtn = false;
    this.isHiddenEditActionBtn = true;
    this.isHiddenSaveActionBtn = true;
    this.isHiddenSaveCreateBtn = true;
  }

  initForm(){
    this.companyForm = this.fb.group({
      positionId: new FormControl({value: '0'}),
      activitySelect: new FormControl({value: '0'}),
      positionNameAr: new FormControl({ value: '', disabled: true }, [Validators.required]),
      positionNameEn: new FormControl({ value: '', disabled: true }, [Validators.required]),
    });
  }

  private loadPlaces(): void{
    this.places = this.placeService.readonlyPlacesModel;
    this.placeService.loadPlaces();
  }

  private loadActivities(): void{
    this.activities = this.activityService.readonlyactivitiesModel;
    this.activityService.getAllActivitesSubject();
  }

  @Input()
  set companyObject(company: Company) {
    this.company = company;
  }

  selectedActivity(activity: Activities){
    console.log(activity);
  }

  SelectPlace(place: Place){
    console.log(place);
  }

  showBtns(): void {

  }

  showCreateSaveBtn(): void{

  }

  createPosition(): void{

  }

  Cancel(): void{

  }

  updatePosition(): void{

  }

}
