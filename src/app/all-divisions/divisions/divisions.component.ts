
import { Component, OnInit } from '@angular/core';
import { DivisionsService } from '../../../services/divisions.service';
import { Division } from 'models/division.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-divisions',
  templateUrl: './divisions.component.html',
  styleUrls: ['./divisions.component.scss']
})
export class DivisionsComponent implements OnInit {

  searchText:string;
  divisionsList: any;
  divisionNew : any;

 divisions: Observable<Division[]>;
 
 division: Division;
  constructor(private divisionsService: DivisionsService) { }

  ngOnInit() {
    this.loadAllDivisions();
  }
//#region 0 loadAllDivisions() To Load All Stored divisions Data
  private loadAllDivisions() {
    this.divisions = this.divisionsService.readonlyDivisionsModel;
    this.divisionsService.getDivisions();
  }
  //#endregion

//#region deleteDivision() to delete record
  deleteDivision(divistion: Division){
    this.divisionsService.deleteDivision(divistion.divisionId)
  }
  //#endregion

  clearTextOutput(searchText: string){
    this.searchText = searchText;
  }

//#region  catchDivision() to pass data to form 
  catchDivision(division: Division){
    this.divisionsService.setDivisionSubject(division.divisionId);
  }
  //#endregion

}
