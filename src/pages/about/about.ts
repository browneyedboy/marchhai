import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import {SQLite} from "ionic-native";

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

    public database: SQLite;
    public videos: Array<Object>;

    constructor(public navCtrl: NavController, public http: Http, private platform: Platform) {
  		//<np>/index.php/api/favorites/<USER ID>?limit=<10, 20 etc>&token=M@RCH@@KH@!@P!
  		var userdata = global.userdetailget();
        this.http.get('http://www.marchaahai.mn/index.php/api/favorites/'+userdata.id+'?limit=20&token=M@RCH@@KH@!@P!').map(
        res => res.json()).subscribe(data => {
            this.contents = data.response;
        },
        err => {
            console.log("Oops!");
        });

        this.platform.ready().then(() => {
            this.database = new SQLite();
            this.database.openDatabase({name: "data.db", location: "default"}).then(() => {
                this.refresh();
            }, (error) => {
                console.log("ERROR: ", error);
            });
        });
        
    }
    public ionViewDidLoad() {
        this.refresh();
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

    public refresh() {
        // this.storage.query("SELECT * FROM videos").then((data) => {
        //     if(data.res.rows.length > 0) {
        //         this.downList = [];
        //         for(let i = 0; i < data.res.rows.length; i++) {
        //             this.downList.push({
        //                 "id": data.res.rows.item(i).id,
        //                 "title": data.res.rows.item(i).title,
        //                 "picture": data.res.rows.item(i).picture,
        //                 "video": data.res.rows.item(i).video
        //             });
        //         }
        //         console.log(this.downList);
        //     }
        // }, (error) => {
        //     console.log(error);
        // });
        this.database.executeSql("SELECT * FROM videos2", []).then((data) => {
            this.videos = [];
            if(data.rows.length > 0) {
                for(var i = 0; i < data.rows.length; i++) {
                    this.videos.push({video_id: data.rows.item(i).video_id, title: data.rows.item(i).title, picture: data.rows.item(i).picture, video: data.rows.item(i).video});
                }
            }
            console.log(this.videos);
        }, (error) => {
            console.log("ERROR: " + JSON.stringify(error));
        });

    }

}
