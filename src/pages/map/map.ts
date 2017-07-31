import { Component } from '@angular/core';
import { Events, NavController, ToastController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public geolocation: Geolocation, public photon: PhotonProvider, public events:Events ) {
    
    events.subscribe('search', () => {
      this.drawRoute();
    });
  }
  


  findLocation()
  {
    this.map.locate({setView: true, maxZoom: 16});
  }

  drawRoute()
  {
    console.log("START/END COORDS: " + this.photon.coords[0] + ", " + this.photon.coords[1] + " TO " + this.photon.coords[2] + ", " + this.photon.coords[3]);
    
    //We use <any> to avoid typescript error Routing module not found
    let routing = (<any>L).Routing.control({
      waypoints:[
        L.latLng(this.photon.coords[1], this.photon.coords[0]),
        L.latLng(this.photon.coords[3], this.photon.coords[2])
      ],
      routeWhileDragging: true,
    });
    routing.addTo(this.map);
    console.log(routing);
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
        position: 'top'
      });
      toast.present();
    }
  }
}

