import {Component, OnInit} from '@angular/core';
import {RegisterService} from './register.service';
import {UtilsService} from '../utils.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {TabsPage} from '../tabs/tabs.page';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
    errorMessage;
    public errorsMessage = {
        name: [
            {type: 'required', message: 'fullname required'},

        ],
        email: [
            {type: 'required', message: 'email address required'},

        ],
        mobile_number: [
            {type: 'required', message: 'mobile number required'},
            {type: 'maxlength', message: 'mobile number cant be longer than 10 characters'},

        ],
        password: [
            {type: 'required', message: 'password required'},

        ],
        confirm_password: [
            {type: 'required', message: 'password required'},
            {type: 'maxlength', message: 'confirm password must be same as password'},
            {type: 'minlength', message: 'confirm password must be same as password'},

        ]
    };

    submitform = this.formBuilder.group({
        name: ['', [Validators.required]],

        email: ['', Validators.compose([
            Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])],

        mobile_number: ['', [Validators.required, Validators.maxLength(10)]],
        password: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
        confirm_password: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(4)]]
    }, );


    constructor(private registerService: RegisterService,
                private utils: UtilsService,
                private formBuilder: FormBuilder,
                private router: Router,
                private tabPage: TabsPage,) {
    }

    ngOnInit() {
    }

    onSubmit() {
        this.registerService.Register(this.submitform.value).subscribe(data => {
            this.utils.presentToast('You have registered successfully, please login');
            window.localStorage.setItem('token', data['token']);
            window.localStorage.setItem('user', data['user'].name);
            this.utils.presentToast('Logged in as ' + data['user'].name);
            this.router.navigate(['/tabs/tab1']);
            this.tabPage.refresh();
            this.submitform.reset();
            this.errorMessage = null;
        }, error => {
            this.errorMessage = error.error;
            // try {
            //     this.utils.presentToast(error.error.error[0]);
            // } catch (e) {
            //     this.utils.presentToast('Some Error Occurred');
            //
            // }

        });
    }

    checkPasswords(group: FormGroup) { // here we have the 'passwords' group
        let pass = group.get('password').value;
        let confirmPass = group.get('confirm_password').value;
        return pass === confirmPass ? null : {notSame: true};
    }

    get name() {
        return this.submitform.get('name');
    }

    get email() {
        return this.submitform.get('email');
    }

    get mobile_number() {
        return this.submitform.get('mobile_number');
    }

    get password() {
        return this.submitform.get('password');
    }

    get confirm_password() {
        return this.submitform.get('confirm_password');

    }


}
