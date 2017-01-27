import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';
import { Network, ScreenOrientation } from 'ionic-native';
import {ListPage} from '../lists/lists';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	categories: any;

  constructor(public navCtrl: NavController, public http: Http, public alertCtrl: AlertController) {
        // watch network for a disconnect
        let disconnectSubscription = Network.onDisconnect().subscribe(() => {
          console.log('network was disconnected :-(');
          let alert = this.alertCtrl.create({
            title: 'Интернэт холболт тасарсан!',
            subTitle: 'Та татаж авсан файлыг үзэх боломжтой!',
            buttons: ['За']
          });
          alert.present();
        });
        // stop disconnect watch
        disconnectSubscription.unsubscribe();

  		this.http.get('http://www.marchaahai.mn/index.php/api/categories?token=M@RCH@@KH@!@P!').map(
  		res => res.json()).subscribe(data => {
	        this.categories = data.response;
	    },
	    err => {
	        console.log("Oops!");
	    });
  }
  ionViewDidLoad(){
    ScreenOrientation.lockOrientation('portrait');
  }
  openListpage(id, title) {
    this.navCtrl.push(ListPage, {
          id: id,
          title: title,
      });
  }
}
