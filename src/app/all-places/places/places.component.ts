import { MainResponse } from './../../../models/mainResponse.model';
import { Observable, of } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { PlacesService } from '../../../services/places.service';
import { ActivatedRoute } from '@angular/router';
import { element } from 'protractor';
import { MatTableDataSource } from '@angular/material/table';
import { Place } from 'models/Response/places.model';
import { DataSource } from '@angular/cdk/table';
import { trigger, animate, state, transition, style } from '@angular/animations';


@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PlacesComponent implements OnInit {

  places: Observable<Place[]>;

  newPlaces: Place[];

 
  columnsToDisplay = ['placeNameAr', 'placeNameEn', 'code'];
  expandedElement: Place;

  constructor(private placesService: PlacesService,private route: ActivatedRoute,) { }

  ngOnInit() {
    // this.dataStudentsList = this.places;
    this.getPlaces();
    console.log(this.columnsToDisplay);
  }
  getPlaces() : void{
    this.places = this.placesService.readonlyPlacesModel;
    this.placesService.loadPlaces()
      .subscribe((result: MainResponse<Place[]>) => {
        this.newPlaces = result.data;
      });
    // console.log(this.newPlaces);
    
  }
  



}

