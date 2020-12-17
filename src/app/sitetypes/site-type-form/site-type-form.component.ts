import { Component, OnInit, Input } from '@angular/core';
import { Company } from 'core/models/Response/company.model';
import { SiteType } from 'core/models/Response/siteType.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SiteTypesService } from 'core/services/sitetypes.service';

@Component({
  selector: 'app-site-type-curd',
  templateUrl: './site-type-form.component.html',
  styleUrls: ['./site-type-form.component.scss']
})
export class SiteTypeFormComponent implements OnInit {


  siteType: SiteType;

  siteTypeForm: FormGroup;

  isHiddenEditActionBtn: boolean;
  isHiddenCreateActionBtn: boolean;
  isHiddenSaveCreateBtn: boolean;
  isHiddenSaveActionBtn: boolean;
  isEdit: boolean;


  constructor(
    private fb: FormBuilder,
    private siteTypeService: SiteTypesService
  ) { }

  ngOnInit(): void {
    this.initButtons();
    this.initForm();
  }

  initButtons() {
    this.isHiddenCreateActionBtn = false;
    this.isHiddenEditActionBtn = true;
    this.isHiddenSaveActionBtn = true;
    this.isHiddenSaveCreateBtn = true;
  }

  initForm() {
    this.siteTypeForm = this.fb.group({
      siteTypeNameAr: new FormControl({ value: '', disabled: true }, [Validators.required]),
      siteTypeNameEn: new FormControl({ value: '', disabled: true }, [Validators.required]),
    });
  }

  @Input()
  set siteTypeObject(siteType: SiteType) {

    if (siteType !== undefined) {
      this.isHiddenEditActionBtn = false;
      this.siteType = siteType;

      this.siteTypeForm = this.fb.group({
        siteTypeNameAr: new FormControl({ value: this.siteType.siteTypeAr, disabled: true }, [Validators.required]),
        siteTypeNameEn: new FormControl({ value: this.siteType.siteTypeEn, disabled: true }, [Validators.required]),
      });
    } else {
      if (siteType !== undefined)
        this.siteTypeForm.reset();
    }

  }

  showBtns() {
    this.siteTypeForm.enable();
    this.isHiddenSaveActionBtn = false;
  }

  showCreateSaveBtn() {
    this.siteTypeForm.enable();
    this.siteTypeForm.reset();
    this.isHiddenEditActionBtn = true;

    this.isHiddenSaveCreateBtn = false;
    this.isHiddenCreateActionBtn = true;
  }

  Cancel() {
    this.isHiddenSaveCreateBtn = true;
    this.isHiddenCreateActionBtn = false;
    this.isHiddenEditActionBtn = true;

    this.siteTypeForm.disable();
    this.siteTypeForm.reset();
    this.isHiddenSaveActionBtn = true;
    this.siteType = null;
  }

  onSubmit(model: any): void{
    console.log(model);
    const siteType = new SiteType();
    
    siteType.siteTypeAr = model.siteTypeNameAr
    siteType.siteTypeEn = model.siteTypeNameEn
    siteType.siteTypeId = 0;
    this.siteTypeService.CreateSiteType(siteType);

    console.log(siteType);

    this.Cancel();
  }

  updatePosition(model: any): void {
    const siteType = new SiteType();
    
    siteType.siteTypeAr = model.siteTypeNameAr
    siteType.siteTypeEn = model.siteTypeNameEn
    siteType.siteTypeId = this.siteType.siteTypeId;

    this.siteTypeService.Update(siteType);

    this.Cancel();
  }

}
