import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from './login.service';
import {UtilsService} from '../utils.service';
import {Router} from '@angular/router';
import {TabsPage} from '../tabs/tabs.page';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    // tslint:disable-next-line:ban-types
    loginresdata: Object = {token: null, user: null};
    // user: [''];
    submitform = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),

    });

    constructor(private loginService: LoginService,
                private utils: UtilsService,
                private router: Router,
                private tabPage: TabsPage,
    ) {
    }

    ngOnInit() {
    }


    onSubmit() {
        this.loginService.Login(this.submitform.value).subscribe(data => {
                this.loginresdata = data;
                try {
                    window.localStorage.setItem('token', data['token']);
                    window.localStorage.setItem('user', data['user'].name);
                    this.utils.presentToast('Logged in as ' + data['user'].name);
                    this.router.navigate(['/tabs/tab1']);
                    this.tabPage.refresh();
                    this.submitform.reset();

                } catch (e) {
                    this.utils.presentToast(e.toString());
                }
            },
            error => {
                this.utils.presentToast(error.error.error[0]);
            }
        )
        ;
    }

}
