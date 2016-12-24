import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Validators, FormGroup, FormControl } from '@angular/forms';

import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

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
	console.log(this.todo.value.email);  	
	console.log(this.todo.value.password);

	this.navCtrl.push(TabsPage);

	// var loginServiceData = {
	//     email: this.email,
	//     password: this.password,
	//     token: 'M@RCH@@KH@!@P!'
	// };

	// 	this.http.post('http://www.marchaahai.mn/index.php/api/login', loginServiceData).map(
		// res => res.json()).subscribe(data => {
	//       console.log(data.response);
	//   },
	//   err => {
	//       console.log("Oops!");
	//   });
  }
}
