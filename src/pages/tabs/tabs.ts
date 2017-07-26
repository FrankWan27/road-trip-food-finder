import { Component } from '@angular/core';

import { SettingsPage } from '../settings/settings';
import { MapPage } from '../map/map';
import { RoutePage } from '../route/route';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = RoutePage;
  tab2Root = MapPage;
  tab3Root = SettingsPage;

  constructor() {

  }
}
