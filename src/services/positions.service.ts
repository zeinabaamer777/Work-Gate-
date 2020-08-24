import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { MainResponse } from 'app/model/mainResponse.model';
import { Position } from 'app/model/Response/position.model'
import { CreatePositionModel } from 'app/model/Request/Position/createPosition.model';


@Injectable({
  providedIn: 'root'
})
export class PositionsService  {

  // private serverUrl = environment.apiUrl;
  
  private endpoint = environment.apiUrl + "/Positions" ;

  private positionBehaviorSubject = new BehaviorSubject<Position[]>([]);
  private dataStorePosition: { position: Position[] } = { position: [] };

  readonly readonlyactivitiesModel = this.positionBehaviorSubject.asObservable();

  constructor(public http: HttpClient) { }

  public getPositions(): void {
    
    this.http.get<MainResponse<Position[]>>(`${this.endpoint}`)
        .subscribe(
          (data: MainResponse<Position[]>) => {
              this.dataStorePosition.position = data.data;
              this.positionBehaviorSubject.next(Object.assign({}, this.dataStorePosition).position);
          }
        );
  }

  public createPosition(position: CreatePositionModel): void  {
      this.http.post<MainResponse<Position>>(`${this.endpoint}`,position)
          .subscribe(
              (data: MainResponse<Position>) => {
                  if(data.code === 200){
                    this.dataStorePosition.position.push(data.data);
                    this.positionBehaviorSubject.next(Object.assign({}, this.dataStorePosition).position);
                  }
              }
          );
  }

  public updatePosition(positionId: number, position: Position): void {
      this.http.put<MainResponse<boolean>>(`${this.endpoint}/${positionId}`, position)
          .subscribe(
            (data: MainResponse<boolean>) => {
              for(var index = 0; index < this.dataStorePosition.position.length; index++){
                if(this.dataStorePosition.position[index].positionId === positionId){
                  this.dataStorePosition.position[index] = position;
                  break;
                }
              }
              this.positionBehaviorSubject.next(Object.assign({}, this.dataStorePosition).position);
            }
          );
  }

  public deletePosition(positionId: number): void {
    this.http.delete<Position>(`${this.endpoint}/${positionId}`)
        .subscribe(
          (data: Position) => {
            this.dataStorePosition.position.forEach(e => {
              if(e.positionId === positionId){
                const index = this.dataStorePosition.position.indexOf(e);
                this.dataStorePosition.position.splice(index, 1);
                this.positionBehaviorSubject.next(Object.assign({}, this.dataStorePosition).position);
                return;
              }
            });
          },
          error => {
            
          }
        );
  }



}