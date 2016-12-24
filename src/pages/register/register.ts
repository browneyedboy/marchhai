import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Validators, FormGroup, FormControl } from '@angular/forms';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
	registerform: FormGroup;
	constructor(public navCtrl: NavController, public http: Http) {
		this.registerform = new FormGroup({
			username: new FormControl('', Validators.required),
	  		useremail: new FormControl('', Validators.required),
	  		userpassword: new FormControl('', Validators.required),
	  		userphone: new FormControl('', Validators.required),
	  		userage: new FormControl('', Validators.required),
	  		usersex: new FormControl('', Validators.required)
		});
	}

	ionViewDidLoad() {
		console.log('Hello RegisterPage Page');
	}
	registerdo(){
		//index.php/api/signup
		// {username: <USERNAME>, 
			// email: <USER EMAIL>, 
			// phone_number: <USER PHONE>, 
			// child_birthday: <USER CHILD BIRTHDAY>, 
			// child_gender: <USER CHILD GENDER>, 
			// password: <USER PASSWORD>, 
			// token=<M@RCH@@KH@!@P!>}

		console.log(this.registerform.value.useremail);  	
		console.log(this.registerform.value.userpassword);

		var loginServiceData = JSON.stringify({
			username: this.registerform.value.username,
		    email: this.registerform.value.useremail,
		    password: this.registerform.value.userpassword,
		    phone_number: this.registerform.value.userphone,
		    child_birthday: '2012-04-08', //this.registerform.value.userage,
		    child_gender: this.registerform.value.usersex,
		    token: 'M@RCH@@KH@!@P!'
		});
		
		this.http.post('http://www.marchaahai.mn/index.php/api/login', loginServiceData)
        .subscribe(data => {
        	console.log(data);
        }, error => {
            console.log("Oooops!");
        });

		// this.http.post('http://www.marchaahai.mn/index.php/api/login', loginServiceData).map(
		// 	res => res.json()).subscribe(data => {
	 //        	console.log(data.response);
	 //    	},
	 //    	err => {
	 //        	console.log("Oops!");
	 //    	});
	}

}
