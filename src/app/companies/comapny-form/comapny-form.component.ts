import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { Company } from '../../../models/Response/company.model';
import { CompaniesService } from 'services/companies.service';
import { ActivitiesService } from 'services/activities.service';
import { PlacesService } from 'services/places.service';
import { Observable } from 'rxjs';
import { Activities } from '../../../models/activities.model';
// import { Place } from '../../../models/Response/place.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Place } from 'models/Response/places.model';

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
  isEdit: boolean;

  selectedCountry: Place;
  selectedGoverment: Place;
  goverments: Place[];

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
      countryId: new FormControl({value: '0', disabled: true}),
      govermentId: new FormControl({value: '0', disabled: true}),
      activityId: new FormControl({value: '0', disabled: true}),
      ComapnyNameAr: new FormControl({ value: '', disabled: true }, [Validators.required]),
      CompanyNameEn: new FormControl({ value: '', disabled: true }, [Validators.required]),
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

    this.isHiddenEditActionBtn = false;
    this.companyForm.disable();

    if(company !== undefined){
      this.company = company;
      console.log(this.company);

      this.companyForm = this.fb.group({
        countryId: new FormControl({value: '', disabled: true }),
        govermentId: new FormControl({value: '', disabled: true }),
        activityId: new FormControl({value: '', disabled: true }),
        ComapnyNameAr: new FormControl({ value: this.company.arName, disabled: true }, [Validators.required]),
        CompanyNameEn: new FormControl({ value: this.company.enName, disabled: true }, [Validators.required]),
      });
  
      this.activities.subscribe( data => {
        const activity = data.find(x => x.activityId === this.company.activityId);
        this.companyForm.controls['activityId'].setValue(activity, { onlySelf: true });
      });

      this.places.subscribe( data => {

        for(let index = 0; index < data.length; index++){
          
          if(data[0].children === null || data[0].children === undefined){
            continue;
          }
          
          const goverment = data[index].children.find(x => x.id === company.placeId);

          if(goverment === null || goverment ===  undefined)
            continue;

            this.goverments = data[index].children;

            this.companyForm.controls['countryId'].setValue(data[index], { onlySelf: true });
            
            this.companyForm.controls['govermentId'].setValue(goverment, { onlySelf: true });

        }

      });
    }

  }

  

  showBtns(): void {
    this.companyForm.enable();
    this.isHiddenSaveActionBtn = false;
  }

  showCreateSaveBtn(): void{
    this.companyForm.enable();
    this.companyForm.reset();

    this.isHiddenSaveCreateBtn = false;
    this.isHiddenCreateActionBtn = true;
    
  }

  onSubmit(model: any): void{

    // const comany

  }

  Cancel(): void{
    this.isHiddenSaveCreateBtn = true;
    this.isHiddenCreateActionBtn = false;
    this.companyForm.disable();
    this.companyForm.reset();
    this.isHiddenSaveActionBtn = true;
  }

  updatePosition(): void{

  }

  selectPlace(event: any){

    this.goverments = event.value.children;
  }

  selectGoverment(event: any){
    console.log(event.value);
  }

}
