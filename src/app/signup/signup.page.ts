import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
 submitform = new FormGroup({
        name: new FormControl(''),
        email: new FormControl(''),
        number: new FormControl(''),
        password: new FormControl(''),
        confirm_psw: new FormControl(''),

   });
  constructor() { }

  ngOnInit() {
  }
    onSubmit() {
         console.warn(this.submitform.value);
    }
}
