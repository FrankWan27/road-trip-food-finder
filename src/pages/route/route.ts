import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PhotonProvider } from '../../providers/photon/photon';
import { MapPage } from '../map/map';

@Component({
  selector: 'page-route',
  templateUrl: 'route.html',
})

export class RoutePage {

  start: string = "";
  end: string = "";

  constructor(public navCtrl: NavController, public photon: PhotonProvider) {


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
    let nav = this.navCtrl;
    
    let promise = this.photon.searchRoute(start, end);
    promise.then(function(){nav.push(MapPage)});
    
  }

}
