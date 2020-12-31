import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteResponsibiltiyCurdComponent } from './roles-form.component';

describe('SiteResponsibiltiyCurdComponent', () => {
  let component: SiteResponsibiltiyCurdComponent;
  let fixture: ComponentFixture<SiteResponsibiltiyCurdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteResponsibiltiyCurdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteResponsibiltiyCurdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
