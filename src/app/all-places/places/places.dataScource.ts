import { DataSource } from "@angular/cdk/collections";
import { Place } from "models/Response/places.model";
import { CollectionViewer } from "@angular/cdk/collections";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import { of } from 'rxjs';

export class PlaceDataSource extends DataSource<Place> {

      constructor(private places: Place[]) {
            super();
      }

      connect(collectionViewer: CollectionViewer): Observable<Place[] | readonly Place[]> {
            return of(this.places);
      }

      disconnect(collectionViewer: CollectionViewer): void {
            
      }

}