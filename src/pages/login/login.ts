import { Component } from '@angular/core';
import { NavController, App, ViewController, ToastController  } from 'ionic-angular';
import {Validators, FormGroup, FormControl } from '@angular/forms';
import {SQLite} from "ionic-native";
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {global} from "../../app/global";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
	todo: FormGroup;
    public database: SQLite;
    ischecked: any = 0;
  	constructor(public navCtrl: NavController, public http: Http, public viewCtrl: ViewController, public appCtrl: App, private toastCtrl: ToastController) {
  	this.todo = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      ischecked: new FormControl('')
    });

    this.platform.ready().then(() => {
        this.database = new SQLite();
        this.database.openDatabase({name: "data.db", location: "default"}).then(() => {
            // this.refresh();
        }, (error) => {
            console.log("ERROR: ", error);
        });
    });

  }

  ionViewDidLoad() {
    
  }

  gotoregister(){
  	this.navCtrl.push(RegisterPage);
  }

  dologin(){
  	// index.php/api/login
  	//{email: <USER EMAIL>, password: <USER PASSWORD>, token=<M@RCH@@KH@!@P!>}

	var loginServiceData = {
	    email: this.todo.value.email,
	    password: this.todo.value.password,
	    token: 'M@RCH@@KH@!@P!'
	};

    console.log(this.todo.value.ischecked);

	this.http.post('http://www.marchaahai.mn/index.php/api/login', loginServiceData)
	.subscribe(data => {
			console.log('userlogged in');
			// console.log(data.status);

			// console.log(data['_body']);
			var body = JSON.parse(data['_body'])
			global.userdetail(body.response);
            var haveuserindata = 0;
            if(this.todo.value.ischecked){
                this.database.executeSql("SELECT * FROM profile where userid = ? limit 1", [body.response.id]).then((data) => {
                    if(data.rows.length > 0) {
                        for(var i = 0; i < data.rows.length; i++) {
                            haveuserindata = data.rows.item(i).userid;
                        }
                    }
                    console.log(this.videos);
                    this.downloads = this.videos;
                }, (error) => {
                    console.log("ERROR: " + JSON.stringify(error));
                });
                if (true) {}
                this.database.executeSql("INSERT INTO profile (userid, useremail, password) VALUES (?, ?, ?)", [body.response.id, this.todo.value.email, this.todo.value.password]).then((data) => {
                    console.log("INSERTED USER: " + JSON.stringify(data));
                }, (error) => {
                    console.log("ERROR USER: " + JSON.stringify(error.err));
                });
            }
            

			//this.navCtrl.push(TabsPage);
			this.viewCtrl.dismiss();
      		this.appCtrl.getRootNav().push(TabsPage);
		},
		err => {
		  	console.log("Oops!");
		  	let toast = this.toastCtrl.create({
                message: 'Таны нууц үг эсвэл имэйл буруу байна!',
                duration: 3000,
                position: 'top',
                cssClass: 'toast-message'
            });

            toast.onDidDismiss(() => {
                console.log('Dismissed toast');
            });

            toast.present();
		});
  }
}
