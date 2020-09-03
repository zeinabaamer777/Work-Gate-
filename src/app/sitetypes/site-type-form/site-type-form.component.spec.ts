import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteTypeFormComponent } from './site-type-form.component';

describe('SiteTypeFormComponent', () => {
  let component: SiteTypeFormComponent;
  let fixture: ComponentFixture<SiteTypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteTypeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
