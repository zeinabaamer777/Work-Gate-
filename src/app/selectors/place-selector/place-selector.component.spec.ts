import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceSelectorComponent } from './place-selector.component';

describe('PlaceSelectorComponent', () => {
  let component: PlaceSelectorComponent;
  let fixture: ComponentFixture<PlaceSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
