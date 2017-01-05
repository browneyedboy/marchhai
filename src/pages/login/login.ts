import { Component } from '@angular/core';
import { NavController, App, ViewController, ToastController  } from 'ionic-angular';
import {Validators, FormGroup, FormControl } from '@angular/forms';

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
    ischecked: any = 0;
  	constructor(public navCtrl: NavController, public http: Http, public viewCtrl: ViewController, public appCtrl: App, private toastCtrl: ToastController) {
  	this.todo = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      ischecked: new FormControl('')
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

			// console.log(body.response);

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
