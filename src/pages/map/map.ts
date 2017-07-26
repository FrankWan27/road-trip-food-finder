import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import 'leaflet';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})

export class MapPage {

  map: any;

  constructor(public navCtrl: NavController, public geolocation: Geolocation) {

  }
  
  findLocation()
  {
    this.map.locate({setView: true, maxZoom: 16});
  }

  ngOnInit(): void {
    console.log(this.geolocation.getCurrentPosition());
    this.map = L.map('map').setView([51.505, -0.09], 13);
    let map = this.map;
    
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiZnJhbmt3YW4yNyIsImEiOiJjajVrcGxrY3kyamlvMzJuem81dHA2dDB5In0.vraVi60phGPP7W46hBnvCA'
    }).addTo(map);

    map.locate({setView: true, maxZoom: 16});



    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);

    function onLocationFound(e)
    {
        var radius = e.accuracy / 2;

        L.marker(e.latlng).addTo(map).bindPopup("You are within " + radius + " meters from this point").openPopup();  
        L.circle(e.latlng, radius).addTo(map);
    }

    function onLocationError(e) {
      alert( "sad :( " + e.message);
    }
  }
}

