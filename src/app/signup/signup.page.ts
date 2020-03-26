import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {RegisterService} from './register.service';
import {UtilsService} from "../utils.service";

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

    constructor(private registerService: RegisterService,
                private utils: UtilsService) {
    }

    ngOnInit() {
    }

    onSubmit() {
        this.registerService.Register(this.submitform.value).subscribe(data => {
            this.utils.presentToast('You have registered succesfully, please login');
        }, error => {
            try {
                this.utils.presentToast(error.error.error[0]);
            } catch (e) {
                this.utils.presentToast('Some Error Occurred');

            }
        });
    }
}
