import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Validators, FormGroup, FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {global} from "../../app/global";
/*
  Generated class for the Changepass page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-changepass',
  templateUrl: 'changepass.html'
})
export class ChangepassPage {
	password: any;
	repassword: any;
	changepassword: FormGroup;
  	constructor(public navCtrl: NavController, public http: Http) {
	  	this.changepassword = new FormGroup({
	      	password: new FormControl('', Validators.required),
	      	repassword: new FormControl('', Validators.required)
	    });
	    
	    console.log(this.changepassword.valid);
	    if (this.changepassword.value.password != this.changepassword.value.repassword) {
	    	this.changepassword.valid = false;
	    }
  	}

  ionViewDidLoad() {
    console.log('Hello ChangepassPage Page');
  }

  dochange(){
  	// {email: <USER EMAIL>, password: <NEW PASSWORD>, token=<M@RCH@@KH@!@P!>}
  	var userdata = global.userdetailget();
  	var loginServiceData = {
	    email: userdata.email,
	    password: this.changepassword.value.password,
	    token: 'M@RCH@@KH@!@P!'
	};

	this.http.post('http://www.marchaahai.mn/index.php/api/changepwd', loginServiceData)
	.subscribe(data => {
		console.log('password changed');
	},
	err => {
	  console.log("Oops!");
	});
  }

}
