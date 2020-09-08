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
// 

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PlacesComponent implements OnInit {
  isTableExpanded = false;

  public products = [];
  displayedColumns: string[] =  ['placeNameAr', 'placeNameEn', 'code','actions'];

  places: Observable<Place[]>;

  newPlaces: Place[];

 
  // columnsToDisplay = ['placeNameAr', 'placeNameEn', 'code'];
  expandedElement: Place;
  // dataSource = new ProductDataSource(this.placesService);

  constructor(private placesService: PlacesService
    ) { }

  ngOnInit() {
    // this.dataStudentsList = this.places;
    this.loadPlaces();
    this.expandedElement = null;
    // this.createTable();
    this.dataStudentsList.data = this.newPlaces;
  }
  dataStudentsList = new MatTableDataSource();
  displayedStudentsColumnsList: string[] = ['placeNameAr', 'placeNameEn', 'code'];

  //#region 0 loadPlaces() method to get All Places data
  loadPlaces() : void{
    this.places = this.placesService.readonlyPlacesModel;
    this.placesService.loadPlaces()
      .subscribe((result: MainResponse<Place[]>) => {
        this.newPlaces = result.data;
        console.log(this.newPlaces);
      });
  }
  //#endregion

  //#region deletePlace()
deletePlace(placeId, event: Event){
  
  this.placesService.deletePlace(placeId, event).subscribe(
    () => {
      this.loadPlaces();
    }
  )
}

//#endregion

//#region onSelect() to display country details on the form
  onSelect(selectedPlace: object) {
    this.placesService.setPlaceSubject(selectedPlace);
  }
//#endregion

}

