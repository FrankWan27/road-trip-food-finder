import { Component } from '@angular/core';
import { Events, NavController, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { PhotonProvider } from '../../providers/photon/photon';
import L from 'leaflet';
import 'leaflet-routing-machine'; 
import * as $ from 'jquery';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})

export class MapPage {
  public bar: any = 0;
  public map: any;
  public currentRoute: any;
  places: string[] = [];
  start: string = "My Location";
  end: string = "";
  
  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public geolocation: Geolocation, public photon: PhotonProvider, public events:Events ) {
    
    events.subscribe('search', () => {
      this.drawRoute();
    });
  }
 
  autocomplete(e: any) {
    console.log(e);
    if (e.target.value != undefined) {
      this.photon.autocomplete(e.target.value).then(
        data => {
          // clear array
          this.places.length = 0;

          // don't know why i can't use data.features
          for (let i = 0; i < data["features"].length; i++) {
            // save some space
            let place = data["features"][i].properties;

            // string to save
            let string = "";

            if (place.name != undefined) {
              string += place.name;
              string += ", ";
            }

            if (place.street != undefined) {
              string += place.street;
              string += ", ";
            }

            if (place.city != undefined) {
              string += place.city;
              string += ", ";
            }

            if (place.state != undefined) {
              string += place.state;
              string += ", ";
            }

            if (place.country != undefined) {
              string += place.country;
            }

            // add to array
            this.places[i] = string;
          }
        }
      );
    }
  }

  replaceQuery(e: any) {
    //bar: 0 = origin, bar: 1 = destination
    if(this.bar == 0)
      this.start = e.srcElement.innerText;
    else
      this.end = e.srcElement.innerText;
    this.places.length = 0;

    if(this.start != "" && this.end != "")
    {
      this.search();
      this.gebak();
    }
  }

  search()
  {
    let start = this.start;
    let end = this.end;
    let events = this.events;

    let toast = this.toastCtrl.create({
        message: "Starting or End Destination is Empty!",
        duration: 3000,
        position: 'bottom'
      });

    if(start == "" || end == "")
      toast.present();
    else
    {
      //go to map page
      // this.navCtrl.parent.select(1); 

      let promise = this.photon.searchRoute(start, end);
      promise.then(function(){
        events.publish('search');
      });

    }
  }

  gebak()
  {
    $('#search').css('background-color', "rgba(250, 250, 250, 0)");
    $('#locate').show();
    $('#list').animate({'top': '100vh'}, 400, function() {$('#list').hide();});
    $('#menu').show();
    $('#back').hide();
    $('#origin').hide();

  }

  // searchBlur()
  // {
  //   $('#search').css('background-color', "rgba(250, 250, 250, 0)");
  //   $('#locate').show();
  //   $('#list').animate({'top': '100vh'}, {duration : 400});
  //   $('#menu').show();
  //   $('#back').hide();
  // }

  searchFocus()
  {
    $('#search').css('background-color', "rgba(250, 250, 250, 100)");
    $('#locate').hide();
    $('#list').animate({'top': '0px'}, {duration : 400});
    $('#list').show();
    $('#menu').hide();
    $('#back').show();
    $('#origin').show();
  }

  findLocation()
  {
    this.map.locate({setView: true, maxZoom: 16});
  }

  drawRoute()
  {
    console.log("START/END COORDS: " + this.photon.coords[0] + ", " + this.photon.coords[1] + " TO " + this.photon.coords[2] + ", " + this.photon.coords[3]);
    if(this.currentRoute != undefined)
      this.currentRoute.remove();
    //We use <any> to avoid typescript error Routing module not found
    this.currentRoute = (<any>L).Routing.control({
      waypoints:[
        L.latLng(this.photon.coords[1], this.photon.coords[0]),
        L.latLng(this.photon.coords[3], this.photon.coords[2])
      ],
      routeWhileDragging: true,
    });
    this.currentRoute.addTo(this.map);
  }
  
  ngOnInit(): void {

    this.map = L.map('map').setView([37.7749, -122.4194], 12);
    
    let map = this.map; //actually cancer pls fix
    let toastCtrl = this.toastCtrl; // same

    //initalize map
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiZnJhbmt3YW4yNyIsImEiOiJjajVrcGxrY3kyamlvMzJuem81dHA2dDB5In0.vraVi60phGPP7W46hBnvCA'
    }).addTo(map);

    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);

    function onLocationFound(e)
    {
        var radius = e.accuracy / 2;

        L.marker(e.latlng).addTo(map).bindPopup("You are within " + radius + " meters from this point").openPopup();  
        L.circle(e.latlng, radius).addTo(map);
    }


    function onLocationError(e) {
      let toast = toastCtrl.create({
        message: "sad :( " + e.message,
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    }
  }
}

