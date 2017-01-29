import { Component } from '@angular/core';

import { NavController, Platform } from 'ionic-angular';
import {global} from "../../app/global";
import { ChangepassPage } from "../changepass/changepass";
import { HelpPage } from '../help/help';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
	username: any;
	email: any;
	phone: any;
    expire_date: any;
    expire_word: any;
  constructor(public navCtrl: NavController, public platform: Platform) {
  	var userdata = global.userdetailget();
  	console.log(userdata.id);
  	this.username = userdata.username;
  	this.email = userdata.email;
    this.phone = userdata.phone;
    this.expire_date = userdata.expire_date;
    if(userdata.expire_date == 0){
        this.expire_word = 'Та марчаахайг худалдаж авснаар ашиглах эрхтэй болно.';
    }else{
        this.expire_word = 'Та марчаахайг ашиглах эрхтэй байна.';
    }
  }
  changepassword(){
  	this.navCtrl.push(ChangepassPage);
  }
  gotohelp(){
    this.navCtrl.push(HelpPage);
  }
}
