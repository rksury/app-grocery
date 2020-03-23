import {Component, OnInit} from '@angular/core';
import {CartService} from './cart.service';
import {UtilsService} from '../utils.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.page.html',
    styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
    cart;
    products;
    isloggedin = window.localStorage.getItem('token') !== null;


    constructor(private cartService: CartService, private utils: UtilsService,
                private router: Router) {
    }

    ngOnInit() {
        this.getCart();
    }

    ionViewWillEnter() {
        this.getCart();
        this.isloggedin = window.localStorage.getItem('token') !== null;
        if (!this.isloggedin) {
            this.router.navigate(['tabs/login']);
        }

    }

    getCart() {
        this.cartService.getCart().subscribe(
            data => {
                this.cart = data;
                this.products = this.cart.products;
                console.log(this.cart.products);
            }, error => {
                this.utils.presentToast('Some Error Occurred');
            }
        );
    }


    update_quantity() {
        console.log('dsad');
    }
}
