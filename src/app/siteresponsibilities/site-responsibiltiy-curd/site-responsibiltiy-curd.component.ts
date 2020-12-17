import { Component, OnInit, Input } from '@angular/core';
import { SiteResponsibility } from 'core/models/Response/siteResponsibility.model';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { SiteResponsibilitiesService } from 'core/services/siteresponsibilities.service';

@Component({
  selector: 'app-site-responsibiltiy-curd',
  templateUrl: './site-responsibiltiy-curd.component.html',
  styleUrls: ['./site-responsibiltiy-curd.component.scss']
})
export class SiteResponsibiltiyCurdComponent implements OnInit {


  siteResponsibility: SiteResponsibility;

  siteResponsibilityForm: FormGroup;

  isHiddenEditActionBtn: boolean;
  isHiddenCreateActionBtn: boolean;
  isHiddenSaveCreateBtn: boolean;
  isHiddenSaveActionBtn: boolean;
  isEdit: boolean;

  constructor(
    private fb: FormBuilder,
    private siteResponsibilityService: SiteResponsibilitiesService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.initButtons();
  }

  initButtons() {
    this.isHiddenCreateActionBtn = false;
    this.isHiddenEditActionBtn = true;
    this.isHiddenSaveActionBtn = true;
    this.isHiddenSaveCreateBtn = true;
  }

  initForm() {
    this.siteResponsibilityForm = this.fb.group({
      siteResponsibilityNameAr: new FormControl({ value: '', disabled: true }, [Validators.required]),
      siteResponsibilityNameEn: new FormControl({ value: '', disabled: true }, [Validators.required]),
    });
  }

  @Input()
  set siteResponsibilityObject(siteResponsibility: SiteResponsibility) {

    if (siteResponsibility !== undefined) {
      this.isHiddenEditActionBtn = false;
      this.siteResponsibility = siteResponsibility;

      this.siteResponsibilityForm = this.fb.group({
        siteResponsibilityNameAr: new FormControl({ value: this.siteResponsibility.siteResponsibilityNameAr, disabled: true }, [Validators.required]),
        siteResponsibilityNameEn: new FormControl({ value: this.siteResponsibility.siteResponsibilityNameEn, disabled: true }, [Validators.required]),
      });
    } else {
      if (siteResponsibility !== undefined)
        this.siteResponsibilityForm.reset();
    }

  }

  showBtns() {
    this.siteResponsibilityForm.enable();
    this.isHiddenSaveActionBtn = false;
  }

  showCreateSaveBtn() {
    this.siteResponsibilityForm.enable();
    this.siteResponsibilityForm.reset();
    this.isHiddenEditActionBtn = true;

    this.isHiddenSaveCreateBtn = false;
    this.isHiddenCreateActionBtn = true;
  }

  Cancel() {
    this.isHiddenSaveCreateBtn = true;
    this.isHiddenCreateActionBtn = false;
    this.isHiddenEditActionBtn = true;

    this.siteResponsibilityForm.disable();
    this.siteResponsibilityForm.reset();
    this.isHiddenSaveActionBtn = true;
    this.siteResponsibility = null;
  }

  onSubmit(model: any): void{
    console.log(model);
    
    const siteResponsibility = new SiteResponsibility();

    siteResponsibility.siteResponsibilityNameAr = model.siteResponsibilityNameAr;
    siteResponsibility.siteResponsibilityNameEn = model.siteResponsibilityNameEn;

    siteResponsibility.siteResponsibilityId = 0;
    // this.siteTypeService.CreateSiteType(siteType);
    this.siteResponsibilityService.createSiteResponsibility(siteResponsibility);

    console.log(siteResponsibility);

    this.Cancel();
  }

  updatePosition(model: any): void {
    const siteResponsibility = new SiteResponsibility();

    siteResponsibility.siteResponsibilityNameAr = model.siteResponsibilityNameAr;
    siteResponsibility.siteResponsibilityNameEn = model.siteResponsibilityNameEn;

    siteResponsibility.siteResponsibilityId = this.siteResponsibility.siteResponsibilityId;
    // this.siteTypeService.CreateSiteType(siteType);
    this.siteResponsibilityService.updateSiteResponsibility(siteResponsibility);

    console.log(siteResponsibility);

    this.Cancel();
  }

}
