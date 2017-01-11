import { Component } from '@angular/core';
import { NavController, ToastController  } from 'ionic-angular';
import {Validators, FormGroup, FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the Forgotpass page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-forgotpass',
  templateUrl: 'forgotpass.html'
})
export class ForgotpassPage {
	forgot: FormGroup;
	mail: any;

	constructor(public navCtrl: NavController, public http: Http, private toastCtrl: ToastController) {
		  	this.forgot = new FormGroup({
		      email: new FormControl('', Validators.required)
		    });
	}

	ionViewDidLoad() {
		console.log('Hello ForgotpassPage Page');
	}

	getpass(){
		//{email: <USER EMAIL>, token=<M@RCH@@KH@!@P!>}
		var loginServiceData = {
		    email: this.forgot.value.email,
		    token: 'M@RCH@@KH@!@P!'
		};
		this.http.post('http://www.marchaahai.mn/index.php/api/pwd', loginServiceData)
		.subscribe(data => {
			let toast = this.toastCtrl.create({
                message: 'Таны имэйл хаяг уруу шинэ нууц үг илгээлээ!',
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
		  	let toast = this.toastCtrl.create({
                message: 'Таны имэйл буруу байна!',
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
