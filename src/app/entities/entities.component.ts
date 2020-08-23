// import { EntitiesService } from 'src/services/entities.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.scss']
})
export class EntitiesComponent implements OnInit {
  searchText:string;
  entitiesList = [
    { 
      avatar : '../assets/images/Images/Entities_0.png',
      name : "places",
      company : "Bip Soft" ,
      router : "places",
      title : "places"
    },
    { 
      avatar : '../assets/images/Images/Entities_1.jpg',
      name : "activities",
      company : "Bip Soft" ,
      router: 'activities'
    },
    { 
      avatar : '../assets/images/Images/Entities_2.webp',
      name : "companies",
      company : "Bip soft" ,
      router: 'companies'
    },
    { 
      avatar : '../assets/images/Images/Entities_3.png',
      name : "departments",
      company : "Bip Soft" ,
      router: 'departments'
    },
    { 
      avatar : '../assets/images/Images/Entities_8.png',
      name : "divisions",
      company : "Bip Soft" ,
      router: 'divisions' 
    },
    
    { 
      avatar : '../assets/images/Images/Entities_4.png',
      name : "positions",
      company : "Bip soft",
      router: 'positions' 
    },
    { 
      avatar : '../assets/images/Images/Entities_6.png',
      name : "siteResponsibilities",
      company : "Bip soft" ,
      router: 'siteResponsibilities'
    },
    { 
      avatar : '../assets/images/Images/Entities_7.png',
      name : "siteTypes",
      company : "Bip Soft" ,
      router: 'siteTypes'
    },
    
    { 
      avatar : '../assets/images/Images/Entities_5.png',
      name : "timeGroups",
      company : "Bip Soft" ,
      router: 'timeGroups'
    }
  ];
  constructor() { }
  ngOnInit() {
    // this.entitiesList = this.entities_service.getEntities(); 

  }
}
