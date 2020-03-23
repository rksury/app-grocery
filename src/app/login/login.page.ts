import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {LoginService} from './login.service';
import {UtilsService} from '../utils.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    // tslint:disable-next-line:ban-types
    loginresdata: Object = {token: null, user: null}
    // user: [''];
    submitform = new FormGroup({
        username: new FormControl(''),
        password: new FormControl(''),

    });

    constructor(private loginService: LoginService,
                private utils: UtilsService,
                private router: Router) {
    }

    ngOnInit() {
    }


    onSubmit() {
        this.loginService.Login(this.submitform.value).subscribe(data => {
                this.loginresdata = data;
                try {
                    window.localStorage.setItem('token', data['token']);
                    window.localStorage.setItem('user', data['user']);
                    this.utils.presentToast('Logged in as ' + data['user'].name);
                    // window.localStorage.setItem('user', data.user);
                    // this.utils.presentToast('Logged in as ' + data.user.name);
                    this.router.navigate(['/tabs/tab1']);
                } catch (e) {
                    this.utils.presentToast(e.toString());
                }
            },
            error => {
                this.utils.presentToast('Some Error Occurred');
            }
        )
        ;
    }

}
