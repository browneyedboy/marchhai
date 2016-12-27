import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Changepass page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-changepass',
  templateUrl: 'changepass.html'
})
export class ChangepassPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello ChangepassPage Page');
  }

}
