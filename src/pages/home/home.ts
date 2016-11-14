import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import {ListPage} from '../lists/lists';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  openListpage() {
    this.navCtrl.push(ListPage);
  }
}
