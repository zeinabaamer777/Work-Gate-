import { Division } from 'core/models/division.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HttpClientCrudService } from './http-client-crud.service';


@Injectable({
  providedIn: 'root'
})
export class DivisionsService extends HttpClientCrudService<Division, number>{

   // private serverUrl = environment.apiUrl;
  
   private endpoint = environment.apiUrl + "/Divisions" ;

   private divisionBehaviorSubject = new BehaviorSubject<Division[]>([]);
   private dataStoreDivision: { division: Division[] } = { division: [] };
 
   readonly readonlyDivisionsModel = this.divisionBehaviorSubject.asObservable();
 
   constructor(protected _http: HttpClient) {
    super(_http, `${environment.apiUrl}/Activities`);
  }
  
 
   public getDivisions(): void {  
     this.findAll()
         .subscribe(
           (data: Division[]) => {
               this.dataStoreDivision.division = data;
               this.divisionBehaviorSubject.next(Object.assign({}, this.dataStoreDivision).division);
           }
         );
   }
 
   public createDivision(division: Division){
       this.save(division)
           .subscribe(
               (data: Division) => {
                     this.dataStoreDivision.division.push(data);
                     this.divisionBehaviorSubject.next(Object.assign({}, this.dataStoreDivision).division);
               }
           );
   }
 
   public updateDivision(id: number, division: Division){
       this.update(id, division)
           .subscribe(
             (data: boolean) => {
               for(var index = 0; index < this.dataStoreDivision.division.length; index++){
                 if(this.dataStoreDivision.division[index].divisionId === id){
                   this.dataStoreDivision.division[index] = division;
                   break;
                 }
               }
               this.divisionBehaviorSubject.next(Object.assign({}, this.dataStoreDivision).division);
             }
           );
   }
 
   public deleteDivision(divisionId: number) {
     this.delete(divisionId)
         .subscribe(
           (data: Division) => {
             this.dataStoreDivision.division.forEach(e => {
               if(e.divisionId === divisionId){
                 const index = this.dataStoreDivision.division.indexOf(e);
                 this.dataStoreDivision.division.splice(index, 1);
                 this.divisionBehaviorSubject.next(Object.assign({}, this.dataStoreDivision).division);
                 return;
               }
             });
           },
           error => {
             
           }
         );
   }
  //#region Subject 
  // private transferSubject$ : Subject<Division> = new Subject<Division>();

  // getDivisionSubject(){
  //   return this.transferSubject$;
  // }

  // setDivisionSubject(divisionId){
  //   this.transferSubject$.next(divisionId);
  // }
  //#endregion
 
 
 }