import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps'

@Component({
  selector: 'app-user-map',
  templateUrl: './user-map.component.html',
  styleUrls: ['./user-map.component.scss']
})

export class UserMapComponent implements OnInit, AfterViewInit {
  //#region 0 : Public Variables
  map: google.maps.Map;
  coordinates: google.maps.LatLng;
  mapOptions: any;
  markers: any[] = [];
  newmarkers: any[] = [];
  circles: any[] = [];
  test: any;
  dataTest: any[];
  myLatlng: google.maps.LatLng;
  markerWithText: any[];
  splitedStLatLng: string;
  splitedEndLatLng: string;
  arrIndex: any;
  //#endregion

  constructor() { }

  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow
  @ViewChild("userMapContainer", { static: false }) gmap: ElementRef;

  ngOnInit(): void {

  }
  randomColor = '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
  infoContent = ''
  zoom = 12
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  }

  //#region   01: input with data To Draw Sites Array Markers of all user's site
  @Input()
  set ChangeMap(data: any) {
    this.test = data;
    // debugger;
    // console.log("data output from user map ",data);
    if (data != null && this.markers && this.circles) {
      this.markers = [];
      this.circles = [];
      data.forEach(e => {
        this.addMarker(e.latitude, e.longitude, e.siteName);
        this.addCircle(e.latitude, e.longitude, this.randomColor);
      });
    }
  }

  //#region   02: input with data To Draw siteAttendanceVM Array Markers (startLatLong,endLatLong)
  @Input()
  set siteMarkerData(attendenceVM: any[]) {
    this.dataTest = attendenceVM;
    console.log("attendence output from user map ", attendenceVM);
    if (attendenceVM != null) {
      attendenceVM.forEach(a => {
        debugger;
        if(a.startLatLong){
          var splitedStLatLng = a.startLatLong.split(",");
          
          // call addGreenFlagMarker method
          this.addGreenFlagMarker(parseFloat(splitedStLatLng[0]), parseFloat(splitedStLatLng[1]), a.startLatLong, type);

        }

        if(a.endLatLong){
          var splitedEndLatLng = a.endLatLong.split(",");

          // call addRedFlagMarker method
          this.addRedFlagMarker(parseFloat(splitedEndLatLng[0]), parseFloat(splitedEndLatLng[1]), a.endLatLong, type)

        }
        var type = "startEndarker";
      });
    }
  }
  //#endregion

  //#region 03 To Draw Locaton Array Markers That Track user Move (location Array from API getBySpecificData)
  @Input()
  set locationsMarkerWithNumbers(locations: any[]) {
    this.markerWithText = locations;
    console.log("locations array from to track user", locations);
    debugger;
    this.newmarkers = [];
    if (locations != null) {
      
      locations.forEach((element,index) => {
        this.addLocationsListMarkers(element.lat, element.lang,index+1);
      });
    }
  }
  //#endregion  

  ngAfterViewInit(): void {
    // this.mapInitializer();
    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: 30.0463846991669,
        lng: 31.208311019406693,
      }
    })
  }

  //#region  04: add circle on map
  addCircle(lat: number, lng: number, color) {
    this.circles.push({
      center: {
        lat: lat,
        lng: lng
      },
      radius: 600,
      options: {
        strokeColor: color,
        strokeOpacity: 1.0,
        strokeWeight: .5,
        fillColor: color,
        fillOpacity: 0.5
      }
    })
  }
  //#endregion

  //#region  05: addMarker function to show sites markers that appear on click on a specific user
  addMarker(lat, lng, winfo) {

    this.markers.push({
      position: {
        lat: lat,
        lng: lng,
      },
      info: winfo
    });
    // get center in the current position
    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: this.markers[0].position.lat,
        lng: this.markers[0].position.lng,
      }
    })
  }
  //#endregion

  //#region 06: addGreenFlagMarker function that display markers of startLatLng
  addGreenFlagMarker(lat, lng, winfo, type) {
    //debugger;
    
    this.newmarkers.push({
      position: {
        lat: lat,
        lng: lng
      },
      type: type,
      info: 'Start latlng' + winfo,
      options: {
        animation: google.maps.Animation.DROP,
        icon: {
          url: "../../assets/images/map/green-flag.png",
          scaledSize: new google.maps.Size(30, 30), // scaled size
          origin: new google.maps.Point(0, 0), // origin
          anchor: new google.maps.Point(0, 0) // anchor
        }
      }
    });

    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: this.markers[0].position.lat,
        lng: this.markers[0].position.lng,
      }
    })

  }
  //#endregion 

  //#region 07: addRedFlagMarker function that display markers of endtLatLng
  addRedFlagMarker(lat, lng, winfo, type) {
    debugger;
    this.newmarkers.push({
      position: {
        lat: lat,
        lng: lng
      },
      type: type,
      info: 'end latlng ' + winfo,
      options: {
        animation: google.maps.Animation.DROP,
        icon: {
          url: "../../assets/images/map/red-flag.png",
          scaledSize: new google.maps.Size(40, 40), // scaled size
          origin: new google.maps.Point(0, 0), // origin
          anchor: new google.maps.Point(0, 0) // anchor
        }
      }
    });

    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: this.markers[0].position.lat,
        lng: this.markers[0].position.lng,
      }
    })
  }
  //#endregion

  //#region 08: addLocationsListMarkers To Draw Locations List Markers
  addLocationsListMarkers(lat, lng, i) {
    this.newmarkers.push({
      position: {
        lat: lat,
        lng: lng
      },
      info: "location " + i,
      options: {
        animation: google.maps.Animation.DROP,
        icon: {
          url: `https://cdn.mapmarker.io/api/v1/pin?size=120&background=%230062B1&text=${i}&color=%23FFFFFF&voffset=-0.5&hoffset=-0.5&`,
          scaledSize: new google.maps.Size(60, 60), // scaled size
          origin: new google.maps.Point(0, 0), // origin
          anchor: new google.maps.Point(0, 0) // anchor
        }
      }
    });

    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: this.markers[0].position.lat,
        lng: this.markers[0].position.lng,
      }
    })
  }

  //#endregion

  //#region 09: Info Window Of All Markers
  openInfo(marker: MapMarker, content) {
    this.infoContent = content
    this.info.open(marker)
  }

  //#endregion
}
