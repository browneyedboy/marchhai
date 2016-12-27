import { Component } from '@angular/core';

import { NavController, Platform } from 'ionic-angular';
import {global} from "../../app/global";
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController, public platform: Platform) {
  	var userdata = global.userdetailget();
  	console.log(userdata);
  }
  exitApp(){
    this.platform.exitApp();
  }

}
