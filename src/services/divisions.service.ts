import { Division } from './../models/division.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DivisionsService {

   // private serverUrl = environment.apiUrl;
  
   private endpoint = environment.apiUrl + "/Divisions" ;

   private divisionBehaviorSubject = new BehaviorSubject<Division[]>([]);
   private dataStoreDivision: { division: Division[] } = { division: [] };
 
   readonly readonlyDivisionsModel = this.divisionBehaviorSubject.asObservable();
 
   constructor(public http: HttpClient) { }
 
   public getDivisions(): void {
     
     this.http.get<Division[]>(`${this.endpoint}`)
         .subscribe(
           (data: Division[]) => {
               this.dataStoreDivision.division = data;
               this.divisionBehaviorSubject.next(Object.assign({}, this.dataStoreDivision).division);
           }
         );
   }
 
   public createDivision(division: Division): void  {
       this.http.post<Division>(`${this.endpoint}`, division)
           .subscribe(
               (data: Division) => {
                     this.dataStoreDivision.division.push(data);
                     this.divisionBehaviorSubject.next(Object.assign({}, this.dataStoreDivision).division);
               }
           );
   }
 
   public updateDivision(divisionId: number, division: Division): void {
       this.http.put<boolean>(`${this.endpoint}/${divisionId}`, division)
           .subscribe(
             (data: boolean) => {
               for(var index = 0; index < this.dataStoreDivision.division.length; index++){
                 if(this.dataStoreDivision.division[index].divisionId === divisionId){
                   this.dataStoreDivision.division[index] = division;
                   break;
                 }
               }
               this.divisionBehaviorSubject.next(Object.assign({}, this.dataStoreDivision).division);
             }
           );
   }
 
   public deleteDivision(divisionId: number): void {
     this.http.delete<Division>(`${this.endpoint}/${divisionId}`)
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
  private transferSubject$ : Subject<Division> = new Subject<Division>();

  getDivisionSubject(){
    return this.transferSubject$;
  }

  setDivisionSubject(divisionId){
    this.transferSubject$.next(divisionId);
  }
  //#endregion
 
 
 }