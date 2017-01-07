import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Platform } from 'ionic-angular';
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

    public database: SQLite;
    // public fileTransfer: Transfer;

    constructor(public navCtrl: NavController, public params: NavParams , public http: Http, private toastCtrl: ToastController, private platform: Platform) {

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
        this.isbusy = 0;
        this.show = false;
        if (this.userdata.is_paid == 0) {
            this.http.get('http://www.marchaahai.mn/index.php/api/contents?cat='+this.params.get('id')+'&is_paid=1&limit=40&token=M@RCH@@KH@!@P!').map(
            res => res.json()).subscribe(data => {
                this.democontents = data.response;
            },
            err => {
                console.log("Oops!");
            });
            this.show = true;
        }

        this.pagetitle = this.params.get('title');


        this.platform.ready().then(() => {
            this.database = new SQLite();
            this.database.openDatabase({name: "data.db", location: "default"}).then(() => {
                // this.refresh();
            }, (error) => {
                console.log("ERROR: ", error);
            });
        });
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
          fileTransfer.download(url, cordova.file.dataDirectory + video).then((entry) => {
            //download complete: file:///Users/macuser/Library/Developer/CoreSimulator/Devices/F7A40B12-B70D-4502-AB05-002A37ACF1D8/data/Containers/Data/Application/E24F449F-AE49-4E8B-AEF9-C721598C3E72/Library/NoCloud/20161209182125-Gurvan_baavgai.mp4
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

    gotohelp(){
        this.navCtrl.push(HelpPage);
    }


}














