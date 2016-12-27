import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Validators, FormGroup, FormControl } from '@angular/forms';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { TabsPage } from '../tabs/tabs';
import {global} from "../../app/global";

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
        	var body = JSON.parse(data['_body'])
	  		global.userdetail(body.response);
        	this.navCtrl.push(TabsPage);
        }, error => {
            console.log('oops');
        });

	}

}
