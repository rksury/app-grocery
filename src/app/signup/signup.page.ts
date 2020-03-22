import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {RegisterService} from './register.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
    submitform = new FormGroup({
        name: new FormControl(''),
        email: new FormControl(''),
        mobile_number: new FormControl(''),
        password: new FormControl(''),
        confirm_password: new FormControl(''),

    });

    constructor(private registerService: RegisterService) {
    }

    ngOnInit() {
    }

    onSubmit() {
        this.registerService.Register(this.submitform.value).subscribe();
        console.warn(this.submitform.value);
    }
}
