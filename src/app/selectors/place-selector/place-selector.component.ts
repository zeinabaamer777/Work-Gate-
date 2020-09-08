import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Place } from 'models/Response/places.model';


@Component({
  selector: 'app-place-selector',
  templateUrl: './place-selector.component.html',
  styleUrls: ['./place-selector.component.scss']
})
export class PlaceSelectorComponent implements OnInit {
  
  selectedObject: Place;
  selectedGoverment: Place;

  places: Place[];
  goverments: Place[];

  @Output()
  PlaceOut = new EventEmitter<Place>();

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  set passPlaces(places: Place[]){
    this.places = places;
    
    console.log(places);
  }

  selectPlace(){
    this.goverments = this.selectedObject.children;
  }

  selectGoverment(){
    console.log(this.selectedGoverment);
    this.PlaceOut.emit(this.selectedGoverment);
  }

}
