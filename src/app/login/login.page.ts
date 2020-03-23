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
                window.localStorage.setItem('token', this.loginresdata['token']);
                // window.localStorage.setItem('token', data.token);
                //window.localStorage.setItem('user', data.user);
                //this.utils.presentToast('Logged in as ' + data.user.name);
                this.router.navigate(['/tabs/tab1']);
            }
        )
        ;
    }

}
