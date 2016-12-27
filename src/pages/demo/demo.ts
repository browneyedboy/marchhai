import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ListPage} from '../lists/lists';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the Demo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-demo',
  templateUrl: 'demo.html'
})
export class DemoPage {
	categories: any;
  constructor(public navCtrl: NavController, public http: Http) {
  		this.http.get('http://www.marchaahai.mn/index.php/api/categories?token=M@RCH@@KH@!@P!').map(
  		res => res.json()).subscribe(data => {
	        this.categories = data.response;
	    },
	    err => {
	        console.log("Oops!");
	    });
  }
  openListpage(id, title) {
    this.navCtrl.push(ListPage, {
          id: id,
          title: title,
      });
  }
  ionViewDidLoad() {
    console.log('Hello DemoPage Page');
  }

}
