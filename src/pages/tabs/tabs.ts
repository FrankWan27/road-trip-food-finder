import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { RoutePage } from '../route/route';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = RoutePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
