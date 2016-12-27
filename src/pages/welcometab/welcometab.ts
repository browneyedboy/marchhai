import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DemoPage } from '../demo/demo';
import { LoginPage } from '../login/login';
import { HelpPage } from '../help/help';
/*
  Generated class for the Welcometab page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-welcometab',
  templateUrl: 'welcometab.html'
})
export class WelcometabPage {
	tab1Root: any = DemoPage;
  	tab2Root: any = LoginPage;
  	tab3Root: any = HelpPage;

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello WelcometabPage Page');
  }

}
