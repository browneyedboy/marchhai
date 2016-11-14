import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

// import { PlayerPage } from '../player/player';

import { VideoPlayer } from 'ionic-native';

@Component({
  selector: 'page-lists',
  templateUrl: 'lists.html'
})
export class ListPage {

  constructor(public navCtrl: NavController) {

  }
  playVideo(){
  	//this.navCtrl.push(PlayerPage);
  	// Playing a video.
	VideoPlayer.play("file:///android_asset/www/assets/mp4/numbers.mp4").then(() => {
	 console.log('video completed');
	}).catch(err => {
	 console.log(err);
	});

  }
}
