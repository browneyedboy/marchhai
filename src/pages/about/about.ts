import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  
  cond: string = "saved";
  isAndroid: boolean = false;

  constructor(public navCtrl: NavController) {
  	
  }

}
