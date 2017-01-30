import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Platform, ModalController } from 'ionic-angular';
import {SQLite, Transfer} from "ionic-native";
import { PlayerPage } from '../player/player';
import { HelpPage } from '../help/help';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {global} from "../../app/global";
declare var cordova: any;
// import { VideoPlayer } from 'ionic-native';

// import { videojs } from 'video.js';

@Component({
  selector: 'page-lists',
  templateUrl: 'lists.html'
})

export class ListPage {
    contents: any;
    democontents: any;
    pagetitle: any;
    userdata: any;
    show: boolean;
    isbusy: any;
    nodata: boolean;
    theColor: string;

    public database: SQLite;
    // public fileTransfer: Transfer;

    constructor(public navCtrl: NavController, public params: NavParams , 
                public http: Http, private toastCtrl: ToastController, 
                private platform: Platform, public modalCtrl: ModalController) {
        this.nodata = false;
        this.platform.ready().then(() => {
            this.database = new SQLite();
            this.database.openDatabase({name: "data.db", location: "default"}).then(() => {
                // this.refresh();
            }, (error) => {
                console.log("ERROR: ", error);
            });
        });
    }
    ionViewDidEnter(){
        if (this.params.get('id') == 1) {
            this.theColor = 'color089cf7';
        }
        if (this.params.get('id') == 7) {
            this.theColor = 'color7e2d00';
        }
        if (this.params.get('id') == 3) {
            this.theColor = 'color3aad04';
        }
        if (this.params.get('id') == 5) {
            this.theColor = 'color0430a0';
        }
        if (this.params.get('id') == 8) {
            this.theColor = 'colorff0000';
        }
        if (this.params.get('id') == 2) {
            this.theColor = 'colorae000c';
        }

        //http://www.marchaahai.mn/index.php/api/contents?cat=1&is_paid=1&limit=20&token=M@RCH@@KH@!@P!
        ///index.php/api/contents?cat=<CATEGORY ID>&token=M@RCH@@KH@!@P!
        this.userdata = global.userdetailget();
        this.http.get('http://www.marchaahai.mn/index.php/api/contents?cat='+this.params.get('id')+'&is_paid='+this.userdata.is_paid+'&limit=40&token=M@RCH@@KH@!@P!').map(
        res => res.json()).subscribe(data => {
            this.contents = data.response;
        },
        err => {
            console.log("Oops!");
            this.nodata = true;
        });
        this.isbusy = 0;
        this.show = false;
        if (this.userdata.is_paid == 0) {
            this.http.get('http://www.marchaahai.mn/index.php/api/contents?cat='+this.params.get('id')+'&is_paid=1&limit=40&token=M@RCH@@KH@!@P!').map(
            res => res.json()).subscribe(data => {
                this.democontents = data.response;
            },
            err => {
                console.log("Oops!");
                this.nodata = true;
            });
            this.show = true;
        }

        this.pagetitle = this.params.get('title');
    }
    playVideo(id, video, title){
    // http://www.marchaahai.mn/images/content/<CONTENT['id']>/<CONTENT['video']>
  	this.navCtrl.push(PlayerPage, {
          id: id,
          video: video,
          title: title
      });
    // let modal = this.modalCtrl.create(PlayerPage, {
    //     id: id,
    //     video: video
    // });
    // modal.present();
  	// Playing a video.
    // http://marchaahai.mn/images/content/247/20161209182125-Gurvan_baavgai.mp4
    
        // VideoPlayer.play("http://marchaahai.mn/images/content/"+id+"/"+video+"").then(() => {
        //  console.log('video completed');
        //  ScreenOrientation.lockOrientation('landscape');
        //  ScreenOrientation.unlockOrientation();

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
            let toast = this.toastCtrl.create({
                message: 'Миний дуртайд нэмэгдлээ',
                duration: 3000,
                position: 'top',
                cssClass: 'toast-message'
            });

            toast.onDidDismiss(() => {
                console.log('Dismissed toast');
            });

            toast.present();
        },
        err => {
            console.log("Oops!");
        });

    }
    public addtodownload(id, title, picture, video) {

        
        // fileTransfer.abort(); // canceling 
        console.log('top from download');
        const fileTransfer = new Transfer();
          let url = 'http://www.marchaahai.mn/images/content/'+id+'/'+video;
          this.isbusy = id;
          fileTransfer.download(url, cordova.file.dataDirectory + video, true).then((entry) => {
            // console.log('download complete: ' + entry.toURL());
            this.database.executeSql("INSERT INTO videos2 (video_id, title, picture, video) VALUES (?, ?, ?, ?)", [id, title, picture, video]).then((data) => {
                console.log("INSERTED: " + JSON.stringify(data));
                // toast
                let toast = this.toastCtrl.create({
                    message: 'Миний татсанд нэмэгдлээ',
                    duration: 3000,
                    position: 'top',
                    cssClass: 'toast-message'
                });

                toast.onDidDismiss(() => {
                    console.log('Dismissed toast');
                });

                toast.present();

                }, (error) => {
                    console.log("ERROR: " + JSON.stringify(error.err));
                });
                this.isbusy = 0;
          }, (error) => {
            // handle error
            console.log('video tatalt aldaa!');
            });

          // fileTransfer.onProgress(function(){
          //   this.isbusy = true;
          // });

          
    }
    

    gotohelp(){
        this.navCtrl.push(HelpPage);
    }


}














