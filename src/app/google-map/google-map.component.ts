import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit, AfterViewInit {
  
  //from service
  sitelat: number;
  sitelng: number;
  siteName: string;
  siteAddress: string;

  coordinates: google.maps.LatLng;
  mapOptions: any;
  markers: { position: google.maps.LatLng; map: google.maps.Map<Element>; title: string; }[];
  marker: google.maps.Marker;
  contentString: string;
  circleOption: { strokeColor: string; strokeOpacity: number; strokeWeight: number; fillColor: string; fillOpacity: number; map: google.maps.Map<Element>; center: google.maps.LatLng; radius: number; };
  circle: google.maps.Circle;

  test: any;

  constructor() { }
  @ViewChild("mapContainer", { static: false }) gmap: ElementRef;
  map: google.maps.Map;

  ngOnInit(): void {
    // this.mapProperties();
  }

  @Input()
  set ChangeMap(data: any) {
    this.test = data;
    this.sitelat = data.latitude;
    this.sitelng = data.longitude;
    this.siteName = data.siteName;
    this.siteAddress = data.address;
    this.mapProperties();
  }
  

  ngAfterViewInit(): void {
    this.mapInitializer();
   
   
  }
  mapInitializer(): void {
    // initialize map
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    //Adding default marker to map
    this.marker.setMap(this.map);
    this.circle.setMap(this.map);
    //Adding other markers
    // this.loadAllMarkers();
  }

  mapProperties(): void {
    //Coordinates to set the center of the map
    this.coordinates = new google.maps.LatLng(this.sitelat, this.sitelng);
    // Info Window Content
    this.contentString = `<h5>${this.siteName}</h5> ${this.siteAddress}`;
    this.mapOptions = {
      center: this.coordinates,
      zoom: 8
    };

    if (this.marker)
      this.marker.setMap(null);

    this.setMarker();
    
    if(this.circle)
      this.circle.setMap(null);

    this.drawCircle();

    }
   
  drawCircle(): void {
    this.circleOption = {
      strokeColor: '#800000',
      strokeOpacity: 1.0,
      strokeWeight: .5,
      fillColor: '#C64D45',
      fillOpacity: 0.5,
      map: this.map,
      radius: 10000,
      center: this.coordinates
    }
    this.circle = new google.maps.Circle(this.circleOption);
  }
  setMarker(): void {
    this.marker = new google.maps.Marker({
      position: this.coordinates,
      map: this.map,
      title: this.siteName,
    });
    if (this.marker) {
      const infoWindow = new google.maps.InfoWindow({
        content: this.contentString,
      });
      this.marker.addListener("click", () => {
        infoWindow.open(this.marker.getMap(), this.marker);
      });
    
    }
  }
  loadAllMarkers(): void {
    this.markers = [
      {
        position: new google.maps.LatLng(this.sitelat, this.sitelng),
        map: this.map,
        title: this.siteName,
      }
    ];
    this.markers.forEach(markerInfo => {
      //Creating a new marker object
      const marker = new google.maps.Marker({
        ...markerInfo
      });

      //creating a new info window with markers info
      const infoWindow = new google.maps.InfoWindow({
        content: this.contentString
      });

      //Add click event to open info window on marker
      marker.addListener("click", () => {
        infoWindow.open(marker.getMap(), marker);
      });

      //Adding marker to google map
      marker.setMap(this.map);
    });
  }
}
