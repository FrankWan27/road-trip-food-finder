import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { PhotonProvider } from '../../providers/photon/photon';
import L from 'leaflet';
import 'leaflet-routing-machine'; 

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})

export class MapPage {

  public map: any;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public geolocation: Geolocation, public photon: PhotonProvider) {

  }
  


  findLocation()
  {
    this.map.locate({setView: true, maxZoom: 16});
  }

  drawRoute()
  {
    console.log("START/END COORDS: " + this.photon.sLat + ", " + this.photon.sLng + " TO " + this.photon.eLat + ", " + this.photon.eLng);
    //We use <any> to avoid typscript error Routing module not found
    (<any>L).Routing.control({
      waypoints:[
        L.latLng(this.photon.sLng, this.photon.sLat),
        L.latLng(this.photon.eLng, this.photon.eLat)
      ],
      routeWhileDragging: true,
    }).addTo(this.map);
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

    if(this.photon.sLng != undefined && this.photon.eLng != undefined)
      this.drawRoute();

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
        position: 'top'
      });
      toast.present();
    }
  }
}

