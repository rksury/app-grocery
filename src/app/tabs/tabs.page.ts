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
    filterOption: any = {
        header: 'Select Filter',
        subHeader: 'View Multiple Product'
    };

    constructor(private router: Router) {
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

    resetCategories() {
        this.resetCategories = null;
    }
    profile() {
        this.router.navigate(['tabs/profile']);
    }

    my_orders() {
        this.router.navigate(['tabs/order-history']);
    }
    transactions() {
        this.router.navigate(['tabs/transaction']);
    }

    wish_list() {
        this.router.navigate(['tabs/wish_list']);
    }

    category() {
        this.router.navigate(['tabs/category']);
    }

    products() {
        this.router.navigate(['tabs/products']);
    }

    cart() {
        this.router.navigate(['tabs/cart']);
    }

    offers() {
        this.router.navigate(['tabs/offer']);
    }


    login() {
        this.router.navigate(['tabs/login']);
    }

    signup() {
        this.router.navigate(['tabs/signup']);
    }

    logout() {
        window.localStorage.clear();
        this.refresh();
        this.router.navigate(['/tabs/tab1']);
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
