import { Component } from '@angular/core';
import { Events, NavController, ToastController } from 'ionic-angular';
import { PhotonProvider } from '../../providers/photon/photon';
import { MapPage } from '../map/map';

@Component({
  selector: 'page-route',
  templateUrl: 'route.html',
})

export class RoutePage {

  map = MapPage;
  start: string = "My Location";
  end: string = "";
  places: string[] = [];

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public photon: PhotonProvider, public events:Events) {


  }

  autocomplete(e: any) {
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
    this.start = e.srcElement.innerText;
    this.places.length = 0;
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
    if(start == "My Location" && end != "")
    {

    }
    if(start == "" || end == "")
      toast.present();
    else
    {
      //go to map page
      //this.navCtrl.parent.select(1); 

      let promise = this.photon.searchRoute(start, end);
      promise.then(function(){
        events.publish('search');
      });

    }
  }

}
