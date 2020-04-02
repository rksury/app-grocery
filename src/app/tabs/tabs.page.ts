import {Component} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';

// import {Events} from 'ionic-angular';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})
export class TabsPage {
    islogedin = window.localStorage.getItem('token') === null;
    user = window.localStorage.getItem('user');
    searchQuery = '';

    constructor(private router: Router,
    ) {
        this.refresh();
    }

    ionViewWillEnter() {
        this.islogedin = window.localStorage.getItem('token') === null;

    }

    refresh() {
        this.islogedin = window.localStorage.getItem('token') === null;
        this.user = window.localStorage.getItem('user');
        if (this.user === null) {
            this.user = 'Welcome Guest';

        }

    }


    category() {
        this.router.navigate(['tabs/category']);
    }

    offer() {
        this.router.navigate(['tabs/products']);
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

    search(event) {
        const params = {search: this.searchQuery};
        const navigationExtras: NavigationExtras = {
                queryParams: {
                    special: JSON.stringify(params)
                }
            }
        ;
        this.router.navigate(['/tabs/products'], navigationExtras);
    }

}
