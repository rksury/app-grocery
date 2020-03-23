import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {
submitform = new FormGroup({
        fullName: new FormControl('123456'),
        userName: new FormControl(''),
        number: new FormControl(''),
        email: new FormControl(''),
        shipping: new FormControl(''),

   });
  constructor() { }

  ngOnInit() {
  }
  onSubmit() {
     console.warn(this.submitform.value);
   }

}
