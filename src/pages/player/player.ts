import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { ScreenOrientation } from 'ionic-native';
declare var cordova: any;

@Component({
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
  		//platform.isPortrait() or platform.isLandscape()
  		console.log('player page');
	    // this.tabBarElement = document.querySelector('#tabs ion-tabbar-section');
	    // if (platform.isLandscape()) {
		   //  // this.tabBarElement.style.display = 'none';
		   //  console.log('isLandscape');
	    // }
	    // if (platform.isPortrait()) {
		   //  // this.tabBarElement.style.display = 'block';
		   //  console.log('isPortrait');
	    // }

  	}
  	ionViewDidLoad()
    {
        ScreenOrientation.lockOrientation('landscape');
   //      this.tabBarElement.style.display = 'none';
            // import { ScreenOrientation } from 'ionic-native';
            // // set to either landscape
            // ScreenOrientation.lockOrientation('landscape');
            // // allow user rotate
            // ScreenOrientation.unlockOrientation();
    }

    ionViewWillLeave()
    {
        // this.tabBarElement.style.display = 'block';
        ScreenOrientation.unlockOrientation();
    }

}
