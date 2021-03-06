import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, SQLite } from 'ionic-native';

import { WelcometabPage } from '../pages/welcometab/welcometab';
// import { PlayerPage } from '../pages/player/player';



@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
    rootPage = WelcometabPage;


    constructor(platform: Platform) {
        // this.storage = new Storage(SqlStorage);
        // this.storage.query("CREATE TABLE IF NOT EXISTS videos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, picture TEXT, video TEXT)");

        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();

            let db = new SQLite();
            db.openDatabase({
                name: "data.db",
                location: "default"
            }).then(() => {
                // CREATE TABLE IF NOT EXISTS videos 
                db.executeSql("CREATE TABLE IF NOT EXISTS videos2 (id INTEGER PRIMARY KEY AUTOINCREMENT, video_id INTEGER, title TEXT, picture TEXT, video TEXT)", {}).then((data) => {
                    console.log("TABLE CREATED: ", data);
                }, (error) => {
                    console.error("Unable to execute sql", error);
                });

                db.executeSql("CREATE TABLE IF NOT EXISTS profile2 (id INTEGER PRIMARY KEY AUTOINCREMENT, userid INTEGER, useremail TEXT, password TEXT, is_paid INTEGER)", {}).then((data) => {
                    console.log("TABLE CREATED: ", data);
                }, (error) => {
                    console.error("Unable to execute sql", error);
                });
            }, (error) => {
                console.error("Unable to open database", error);
            });

        });
    }
}

