import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PhotonProvider } from '../../providers/photon/photon';

@Component({
  selector: 'page-route',
  templateUrl: 'route.html',
  // providers: [PhotonProvider]
})

export class RoutePage {
  public json: any;
  constructor(public navCtrl: NavController, public photon: PhotonProvider) {
        photon.load();
  }
}
