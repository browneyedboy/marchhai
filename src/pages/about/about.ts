import { Component } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';
import {SQLite, File} from "ionic-native";
declare var cordova: any;
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
    nodata: boolean;

    public database: SQLite;
    public videos: Array<Object>;
    public downloads: any;

    userdata: any;

    constructor(public navCtrl: NavController, public http: Http, private platform: Platform, public alertCtrl: AlertController) {
  		this.nodata = false;
        this.userdata = global.userdetailget();
        this.platform.ready().then(() => {
            this.database = new SQLite();
            this.database.openDatabase({name: "data.db", location: "default"}).then(() => {
                this.refresh();
            }, (error) => {
                console.log("ERROR: ", error);
            });
        });
        
    }
    public ionViewDidEnter() {
        this.refresh();
    }

    playVideo(id, video){
    	this.navCtrl.push(PlayerPage, {
          id: id,
          video: video
        });
     // http://www.marchaahai.mn/images/content/
    //     VideoPlayer.play("http://marchaahai.mn/images/content/"+id+"/"+video+"").then(() => {
    //      console.log('video completed');
    //     }).catch(err => {
    //      console.log(err);
    //     });
    }
    playVideolocal(video){
        this.navCtrl.push(PlayerPage, {
          id: 0,
          video: video
        });

        // VideoPlayer.play(cordova.file.dataDirectory + video).then(() => {
        //  console.log('video completed');
        // }).catch(err => {
        //  console.log(err);
        // });
    }

    doRefresh(refresher) {
        console.log('Begin async operation', refresher);
        this.refresh();
        setTimeout(() => {
          console.log('Async operation has ended');
          refresher.complete();
        }, 2000);
    }

    public refresh() {
        //<np>/index.php/api/favorites/<USER ID>?limit=<10, 20 etc>&token=M@RCH@@KH@!@P!
        
        this.http.get('http://www.marchaahai.mn/index.php/api/favorites/'+this.userdata.id+'?limit=20&token=M@RCH@@KH@!@P!').map(
        res => res.json()).subscribe(data => {
            this.contents = data.response;
        },
        err => {
            console.log("Oops!");
            this.nodata = true;
        });
       
        this.database.executeSql("SELECT * FROM videos2", []).then((data) => {
            this.videos = [];
            if(data.rows.length > 0) {
                for(var i = 0; i < data.rows.length; i++) {
                    this.videos.push({video_id: data.rows.item(i).video_id, title: data.rows.item(i).title, picture: data.rows.item(i).picture, video: data.rows.item(i).video});
                }
            }
            console.log(this.videos);
            this.downloads = this.videos;
        }, (error) => {
            console.log("ERROR: " + JSON.stringify(error));
        });

    }
    removefromdownload(contentid, video){
        let confirm = this.alertCtrl.create({
          title: 'Устгах!',
          message: 'Та итгэлтэй байна уу?',
          buttons: [
            {
              text: 'Үгүй',
              handler: () => {
                console.log('Disagree clicked');
              }
            },
            {
              text: 'Тийм',
              handler: () => {
                console.log('Agree clicked');
                this.database.executeSql("DELETE FROM videos2 WHERE video_id = ?", [contentid]).then((data) => {
                    
                    if(data) {
                        File.removeFile(cordova.file.dataDirectory, video).then(() => { 
                            console.log("video file has deleted");
                            this.refresh();
                        }, (error) => {
                                console.log("error video delete: " + JSON.stringify(error.err));
                        });
                        console.log("deleted from database");
                        console.log(JSON.stringify(data));
                    }

                }, (error) => {
                    console.log("error delete from database: " + JSON.stringify(error));
                });
              }
            }
          ]
        });
        confirm.present();
        
    }
    removefromfav(contentid){
        //<np>/index.php/api/removefav
        //{user_id: <USER ID>, content_id: <CONTENT ID>, token=<M@RCH@@KH@!@P!>}
        let confirm = this.alertCtrl.create({
          title: 'Устгах!',
          message: 'Та итгэлтэй байна уу?',
          buttons: [
            {
              text: 'Үгүй',
              handler: () => {
                console.log('Disagree clicked');
              }
            },
            {
              text: 'Тийм',
              handler: () => {
                console.log('Agree clicked');
                var loginServiceData = {
                    user_id: this.userdata.id,
                    content_id: contentid,
                    token: 'M@RCH@@KH@!@P!'
                };

                this.http.post('http://www.marchaahai.mn/index.php/api/removefav', loginServiceData)
                .subscribe(data => {
                    console.log('removed from fav');
                    this.refresh();
                },
                err => {
                    console.log("Oops!");
                });
              }
            }
          ]
        });
        confirm.present();
        
    }

}
