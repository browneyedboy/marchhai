import { Component } from '@angular/core';
import { NavController, App, ViewController, ToastController, Platform  } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { SQLite } from "ionic-native";
import { RegisterPage } from '../register/register';
import { ForgotpassPage } from '../forgotpass/forgotpass';
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
    haveuserindata :any;
    mail: any;
    password: any;
    ischecked: any;
    is_paid: any;

  	constructor(public navCtrl: NavController, public http: Http, public viewCtrl: ViewController, public appCtrl: App, private toastCtrl: ToastController, private platform: Platform) {
  	this.todo = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      ischecked: new FormControl('')
    });
    console.log(this.todo.valid);
    this.platform.ready().then(() => {
        this.database = new SQLite();
        this.database.openDatabase({name: "data.db", location: "default"}).then(() => {
            // this.refresh();
            this.database.executeSql("SELECT * FROM profile2 LIMIT 1", []).then((data) => {
                if(data.rows.length > 0) {
                    for(var i = 0; i < data.rows.length; i++) {
                        this.haveuserindata = data.rows.item(i).userid;
                        this.mail = data.rows.item(i).useremail;
                        this.password = data.rows.item(i).password;
                        this.is_paid = data.rows.item(i).is_paid;
                        this.ischecked = true;
                    }
                    this.todo.valid = true;
                }
                
            }, (error) => {
                console.log("ERROR: " + error);
            });

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
  gotoforgotpass(){
    this.navCtrl.push(ForgotpassPage); 
  }

  dologin(){
  	// index.php/api/login
  	//{email: <USER EMAIL>, password: <USER PASSWORD>, token=<M@RCH@@KH@!@P!>}
    
    // watch network for a disconnect

            // if (this.is_paid == 1) {
            //     this.viewCtrl.dismiss();
            //     this.appCtrl.getRootNav().push(TabsPage);
            // }


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
            
            if(this.todo.value.ischecked){
                
                if (!this.haveuserindata) {
                    this.database.executeSql("INSERT INTO profile2 (userid, useremail, password, is_paid) VALUES (?, ?, ?, ?)", [body.response.id, this.todo.value.email, this.todo.value.password, body.response.is_paid]).then((data) => {
                        console.log("INSERTED USER: " + data);
                    }, (error) => {
                        console.log("ERROR USER: " + error.err);
                    });
                }
                
            }
            else{
                this.database.executeSql("DELETE FROM profile2", []).then((data) => {
                    console.log("DELETEd USER: " + JSON.stringify(data));
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
