import { Component, OnInit } from '@angular/core';
import { PositionsService } from '../../services/positions.service';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.scss']
})
export class PositionsComponent implements OnInit {

  searchText:string;
  positionsList: any;
  positionData: any;
  positionNew : any;
  
  constructor(private positions_service: PositionsService) { }

  ngOnInit() {
    this.positions_service
    .getPositions()
    .subscribe(lists => {
        this.positionsList= lists;
        this.positionData = this.positionsList.data;
    });
  }
  
  getPosition(position){
    this.positionNew = position;
    console.log(  this.positionNew);

  }

}
