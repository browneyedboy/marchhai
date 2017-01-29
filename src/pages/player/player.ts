import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { ScreenOrientation } from 'ionic-native';

declare var cordova: any;

@Component({
    selector: 'page-player',
    templateUrl: 'player.html'
})
export class PlayerPage {
	video: any;
	tabBarElement:any;
  	constructor(public navCtrl: NavController, public params: NavParams, platform: Platform) {
  		//http://www.marchaahai.mn/images/content/<CONTENT['id']>/<CONTENT['video']>
  		console.log(this.video = this.params.get('video'));
        if (this.params.get('id')!=0) {
            this.video = 'http://www.marchaahai.mn/images/content/'+this.params.get('id')+'/'+this.params.get('video');
        }else{
            this.video = cordova.file.dataDirectory + this.params.get('video');
        }
  		console.log('player page');

  	}
    ionViewWillEnter(){
        ScreenOrientation.lockOrientation('landscape');
    }

    ionViewDidEnter(){
        // document.getElementById("tabs12").style.display = 'none';
        // let myDiv = document.getElementById('tabs12');
        // myDiv.style.display = 'none';



    }

    ionViewWillLeave()
    {
        ScreenOrientation.lockOrientation('portrait');
        // ScreenOrientation.unlockOrientation();
        // document.getElementById("tabs12").style.display = 'flex';
    }

}
