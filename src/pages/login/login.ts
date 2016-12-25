import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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
  	constructor(public navCtrl: NavController, public http: Http) {
  	this.todo = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
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
  	
	//global.userdetailget();


	var loginServiceData = {
	    email: this.todo.value.email,
	    password: this.todo.value.password,
	    token: 'M@RCH@@KH@!@P!'
	};

	this.http.post('http://www.marchaahai.mn/index.php/api/login', loginServiceData)
	.subscribe(data => {
		console.log('userlogged in');
		console.log(data.status);

	  
	  // console.log(data['_body']);
	  var body = JSON.parse(data['_body'])
	  global.userdetail(body.response);
	  // console.log(data['_body']['response']);
	  // console.log(data['_body']);
	  console.log( body.response.id );
	  console.log( body.response.username );
	  // console.log(data['_body'].response.username);
	  this.navCtrl.push(TabsPage);
	  console.log( global.userdetailget() );
	  console.log('all globals ');
	  console.log( global );
	},
	err => {
	  console.log("Oops!");
	  console.log(err);
	});
  }
}
