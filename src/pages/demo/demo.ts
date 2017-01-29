import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ListPage} from '../lists/lists';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
 
@Component({
  selector: 'page-demo',
  templateUrl: 'demo.html'
})
export class DemoPage {
	categories: any;
    nodata: boolean;
  constructor(public navCtrl: NavController, public http: Http) {  	
    this.nodata = false;
  }
  openListpage(id, title) {
    this.navCtrl.push(ListPage, {
          id: id,
          title: title,
      });
  }
  ionViewDidEnter(){

    this.http.get('http://www.marchaahai.mn/index.php/api/categories?token=M@RCH@@KH@!@P!').map(
        res => res.json()).subscribe(data => {       
            this.categories = data.response;
        },
        err => {
            console.log("Oops!");
            this.nodata = true;
            
        });
  }
  ionViewDidLoad() {

    console.log('Hello DemoPage Page');
  }

}
