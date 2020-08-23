import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitetypesComponent } from './sitetypes.component';

describe('SitetypesComponent', () => {
  let component: SitetypesComponent;
  let fixture: ComponentFixture<SitetypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitetypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitetypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
