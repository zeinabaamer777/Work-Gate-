import { Component, OnInit } from '@angular/core';
import { PositionsService } from '../../services/positions.service';
import { Observable } from 'rxjs';
import { Position } from 'app/model/Response/position.model'

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.scss']
})
export class PositionsComponent implements OnInit {

  searchText:string;
  positions: Observable<Position[]>;
  position: Position;

  
  constructor(private positionService: PositionsService) { }

  ngOnInit() {
    this.loadAllPositions();
  }

  private loadAllPositions() {
    this.positions = this.positionService.readonlyPositionsModel;
    this.positionService.getPositions();
  }
  
  catchPosition(position: Position){
    this.position = position;
  }


  deletePosition(position: Position){
    this.positionService.deletePosition(position.positionId);
  }

  clearTextOutput(searchText: string){
    this.searchText = searchText;
  }

}
