import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PhotonProvider } from '../../providers/photon/photon';

@Component({
  selector: 'page-route',
  templateUrl: 'route.html',
})

export class RoutePage {
  
  constructor(public navCtrl: NavController, public photon: PhotonProvider) {

  }
  
  autocomplete(e: any)
  {
    this.photon.autocomplete(e.target.value);
  }

  search()
  {

  }

}
