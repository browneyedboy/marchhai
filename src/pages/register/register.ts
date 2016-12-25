import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Validators, FormGroup, FormControl } from '@angular/forms';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { TabsPage } from '../tabs/tabs';

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

		var loginServiceData = {
			username: this.registerform.value.username,
		    email: this.registerform.value.useremail,   
		    phone_number: this.registerform.value.userphone,
		    child_birthday: this.registerform.value.userage, //2012-04-08
		    child_gender: this.registerform.value.usersex,
		    password: this.registerform.value.userpassword,
		    token: 'M@RCH@@KH@!@P!'
		};
		
		this.http.post('http://www.marchaahai.mn/index.php/api/signup', loginServiceData)
        .subscribe(data => {
        	console.log('registered');
        	console.log(data);
        	this.navCtrl.push(TabsPage);
        }, error => {
            console.log('oops');
            console.log(error);
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
