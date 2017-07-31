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
  start: string = "";
  end: string = "";

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public photon: PhotonProvider, public events:Events) {


  }
  autocomplete(e: any)
  {
    if(e.target.value != undefined)
      this.photon.autocomplete(e.target.value);
  }

  search()
  {
    let start = this.start;
    let end = this.end;
    let events = this.events;

    let toast = this.toastCtrl.create({
        message: "Starting or End Destination is Empty!",
        duration: 3000,
        position: 'top'
      });

    if(start == "" || end == "")
      toast.present();
    else
    {
      //go to map page
      this.navCtrl.parent.select(1); 

      let promise = this.photon.searchRoute(start, end);
      promise.then(function(){
        events.publish('search');
      });

    }
  }

}
