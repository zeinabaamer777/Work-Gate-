import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimegroupComponent } from './timegroup.component';

describe('TimegroupComponent', () => {
  let component: TimegroupComponent;
  let fixture: ComponentFixture<TimegroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimegroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimegroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
