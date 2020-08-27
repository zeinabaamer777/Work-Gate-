import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionSeleclorComponent } from './position-seleclor.component';

describe('PositionSeleclorComponent', () => {
  let component: PositionSeleclorComponent;
  let fixture: ComponentFixture<PositionSeleclorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionSeleclorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionSeleclorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
