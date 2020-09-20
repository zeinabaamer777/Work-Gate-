import { NotificationService } from 'app/notification.service';
import { DialogService } from 'services/dialog.service';
import { MainResponse } from './../../../models/mainResponse.model';
import { Observable, of } from 'rxjs';
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { PlacesService } from '../../../services/places.service';
import { ActivatedRoute } from '@angular/router';
import { element } from 'protractor';
import { MatTableDataSource } from '@angular/material/table';
import { Place } from 'models/Response/places.model';
import { DataSource } from '@angular/cdk/table';
import { trigger, animate, state, transition, style } from '@angular/animations';
import { NotificationDialogService } from 'services/notificationDialog.service';


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
  displayedColumns: string[] = ['placeNameAr', 'placeNameEn', 'code', 'actions'];
  expandedElement: Place | null;

  places: Observable<Place[]>;
  newPlaces: Place[] = [];
  dataSource :any;
  // expandedElement: Place;

  constructor(
    private placesService: PlacesService,
    private cd: ChangeDetectorRef,
    private dialogService: DialogService,
    private notificationDialogService: NotificationDialogService
  ) { }

  ngOnInit() {
    this.loadPlaces();
    this.expandedElement = null;
  }

  //#region 0 loadPlaces() method to get All Places data
  loadPlaces(): void {
    this.places = this.placesService.readonlyPlacesModel;
    this.placesService.loadPlaces();
  }
  //#endregion

  Reload(test: string){
    console.log("Here");
  }

  //#region deletePlace()

  deletePlace(placeId, event: Event){
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(res =>{
      if(res){
         this.placesService.deletePlace(placeId, event).subscribe(
      () => {
        this.loadPlaces();
        this.notificationDialogService.warn('Deleted successfully!');
      }, 
      err => {

      })
        
      }
    });
  }

  //#endregion

  //#region onSelect() to display country details on the form
  onSelect(selectedPlace: object) {
    this.placesService.setPlaceSubject(selectedPlace);
  }
  //#endregion
}

