import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';


@Component({
  templateUrl: 'player.html'
})
export class PlayerPage {
	video: any;
  	constructor(public navCtrl: NavController, public params: NavParams) {
  		//http://www.marchaahai.mn/images/content/<CONTENT['id']>/<CONTENT['video']>
  		this.video = 'http://www.marchaahai.mn/images/content/'+this.params.get('id')+'/'+this.params.get('video');

  	}

}
