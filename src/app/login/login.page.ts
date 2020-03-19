import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  submitform = new FormGroup({
        email: new FormControl(''),
        password: new FormControl(''),

   });

  constructor() { }

  ngOnInit() {}

   onSubmit() {
     console.warn(this.submitform.value);
   }

}
