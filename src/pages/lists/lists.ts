import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { PlayerPage } from '../player/player';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {global} from "../../app/global";

// import { VideoPlayer } from 'ionic-native';

// import { videojs } from 'video.js';

@Component({
  selector: 'page-lists',
  templateUrl: 'lists.html'
})
export class ListPage {
    contents: any;
    pagetitle: any;
    userdata: any;
    constructor(public navCtrl: NavController, public params: NavParams , public http: Http) {

        //http://www.marchaahai.mn/index.php/api/contents?cat=1&is_paid=1&limit=20&token=M@RCH@@KH@!@P!
        ///index.php/api/contents?cat=<CATEGORY ID>&token=M@RCH@@KH@!@P!
        this.userdata = global.userdetailget();
        this.http.get('http://www.marchaahai.mn/index.php/api/contents?cat='+this.params.get('id')+'&is_paid='+this.userdata.is_paid+'&limit=40&token=M@RCH@@KH@!@P!').map(
        res => res.json()).subscribe(data => {
            this.contents = data.response;
        },
        err => {
            console.log("Oops!");
        });

        this.pagetitle = this.params.get('title');
    }
    playVideo(id, video){
    // http://www.marchaahai.mn/images/content/<CONTENT['id']>/<CONTENT['video']>
  	this.navCtrl.push(PlayerPage, {
          id: id,
          video: video
      });
  	// Playing a video.
    //http://marchaahai.mn/images/content/247/20161209182125-Gurvan_baavgai.mp4
        // VideoPlayer.play("http://marchaahai.mn/images/content/247/20161209182125-Gurvan_baavgai.mp4").then(() => {
        //  console.log('video completed');
        // }).catch(err => {
        //  console.log(err);
        // });

    }
    addtofav(contentid){
        //<np>/index.php/api/addfav
        //{user_id: <USER ID>, content_id: <CONTENT ID>, token=<M@RCH@@KH@!@P!>}
        var loginServiceData = {
            user_id: this.userdata.id,
            content_id: contentid,
            token: 'M@RCH@@KH@!@P!'
        };

        this.http.post('http://www.marchaahai.mn/index.php/api/addfav', loginServiceData)
        .subscribe(data => {
            console.log('added to fav');
        },
        err => {
            console.log("Oops!");
        });
    }

    removefromfav(contentid){
        //<np>/index.php/api/removefav
        //{user_id: <USER ID>, content_id: <CONTENT ID>, token=<M@RCH@@KH@!@P!>}
        // var loginServiceData = {
        //     user_id: this.userdata.id,
        //     content_id: contentid,
        //     token: 'M@RCH@@KH@!@P!'
        // };

        // this.http.post('http://www.marchaahai.mn/index.php/api/removefav', loginServiceData)
        // .subscribe(data => {
        //     console.log('removed from fav');
        // },
        // err => {
        //     console.log("Oops!");
        // });
    }


}














