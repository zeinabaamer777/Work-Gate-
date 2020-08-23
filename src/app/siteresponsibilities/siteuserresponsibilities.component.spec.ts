import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteresponsibilitiesComponent } from './siteresponsibilities.component';

describe('SiteresponsibilitiesComponent', () => {
  let component: SiteresponsibilitiesComponent;
  let fixture: ComponentFixture<SiteresponsibilitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteresponsibilitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteresponsibilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
