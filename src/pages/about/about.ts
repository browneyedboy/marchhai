import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {global} from "../../app/global";
import { PlayerPage } from '../player/player';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  
  cond: string = "saved";
  isAndroid: boolean = false;
  contents: any;

  constructor(public navCtrl: NavController, public http: Http) {
  		//<np>/index.php/api/favorites/<USER ID>?limit=<10, 20 etc>&token=M@RCH@@KH@!@P!
  		var userdata = global.userdetailget();
        this.http.get('http://www.marchaahai.mn/index.php/api/favorites/'+userdata.id+'?limit=20&token=M@RCH@@KH@!@P!').map(
        res => res.json()).subscribe(data => {
            this.contents = data.response;
        },
        err => {
            console.log("Oops!");
        });
        
  }
  playVideo(id, video){
  	this.navCtrl.push(PlayerPage, {
          id: id,
          video: video
     });
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

}
