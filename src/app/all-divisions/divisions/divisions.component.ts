
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
  division: Division ;
  divisions: Observable<Division[]>;

  constructor(private divisionsService: DivisionsService) { }

  ngOnInit() {
    this.loadDivisions();
  }

  loadDivisions(): void{
    this.divisions = this.divisionsService.readonlyDivisionsModel;
    this.divisionsService.getDivisions();
  }

  catchDivision(division: Division): void{
    this.division = division;
  }

  deleteDivision(division: Division){
    this.divisionsService.deleteDivision(division.divisionId);
  }

}
