import {Component} from '@angular/core';
import {Router} from '@angular/router';

// import {Events} from 'ionic-angular';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})
export class TabsPage {
    islogedin = window.localStorage.getItem('token') === null;
    user = window.localStorage.getItem('user');

    constructor(private router: Router,
    ) {
        // this.events.subscribe('user:loggedin', user => {
        //     console.log(user);
        // });
    }

    ionViewWillEnter() {
        this.islogedin = window.localStorage.getItem('token') === null;
        console.log(this.user);

    }

    refresh() {
        this.islogedin = window.localStorage.getItem('token') === null;
        this.user = window.localStorage.getItem('user');
        if (this.user === null) {

        }

    }


    category() {
        this.router.navigate(['tabs/category']);
    }

    offer() {
        this.router.navigate(['tabs/offer']);
    }

    cart() {
        this.router.navigate(['tabs/cart']);
    }

    profile() {
        this.router.navigate(['tabs/profile']);
    }

    login() {
        this.router.navigate(['tabs/login']);
    }

    signup() {
        this.router.navigate(['tabs/signup']);
    }

    products() {
        this.router.navigate(['tabs/products']);
    }

    logout() {
        window.localStorage.clear();
        this.refresh();
    }

}
