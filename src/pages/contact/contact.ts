import { Component } from '@angular/core';

import { NavController, Platform } from 'ionic-angular';
import {global} from "../../app/global";
import { ChangepassPage } from "../changepass/changepass";
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
	username: any;
	email: any;
	phone: any;
    expire_date: any;
  constructor(public navCtrl: NavController, public platform: Platform) {
  	var userdata = global.userdetailget();
  	console.log(userdata.id);
  	this.username = userdata.username;
  	this.email = userdata.email;
    this.phone = userdata.phone;
    this.expire_date = userdata.expire_date;
  }
  exitApp(){
    this.platform.exitApp();
  }
  changepassword(){
  	this.navCtrl.push(ChangepassPage);
  }
}
