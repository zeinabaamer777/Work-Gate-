import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComapnyFormComponent } from './comapny-form.component';

describe('ComapnyFormComponent', () => {
  let component: ComapnyFormComponent;
  let fixture: ComponentFixture<ComapnyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComapnyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComapnyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
