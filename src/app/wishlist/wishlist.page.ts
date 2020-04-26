import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../products/product.service';
import {CartService} from '../cart/cart.service';
import {UtilsService} from '../utils.service';
import {FormControl, FormGroup} from '@angular/forms';
import {WishlistService} from './wishlist.service';

@Component({
    selector: 'app-wishlist',
    templateUrl: './wishlist.page.html',
    styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit {

    submitform = new FormGroup({
        Quantity: new FormControl(''),
        pk: new FormControl(''),
    });
    special;
    products;
    showWishlist = true;
    isloggedin = window.localStorage.getItem('token') !== null;
    wishlist;

    constructor(private route: ActivatedRoute,
                private cartService: CartService,
                private wishlistService: WishlistService,
                private utils: UtilsService,
                private router: Router) {
    }

    ngOnInit() {
        this.get_wish_list();

    }

    ionViewWillLeave() {
        this.products = [];
        this.special = {};

    }

    ionViewWillEnter() {
        this.products = [];
        this.special = {};
        this.get_wish_list();
    }


    get_wish_list() {
        this.wishlistService.get_wishlist().subscribe(data => {
                this.wishlist = data;
                this.products = this.wishlist;
                this.showWishlist = true;
            }, error => {
                this.wishlist = {};
                this.showWishlist = false;
                this.products = {};
                if (error.status === 404) {
                    this.wishlist = {};
                    this.showWishlist = false;
                    this.products = {};
                } else if (error.status === 401) {

                } else {
                    try {
                        this.utils.presentToast(error.error.error[0]);
                    } catch (e) {
                        //this.utils.presentToast('Some Error Occurred');

                    }

                }
            }
        );
    }


    addTocart(pk) {
        this.cartService.add_to_cart(pk).subscribe(data => {
            this.utils.presentToast('Added to cart.');
        }, error => {
            try {
                this.utils.presentToast(error.error.error[0]);
            } catch (e) {
                //this.utils.presentToast('Some Error Occurred');

            }
            if (error.status === 401) {
                this.router.navigate(['tabs/login']);

            }
        });
    }

    addTowishlist(pk) {
        this.wishlistService.add_To_wishlist(pk).subscribe(data => {
            this.utils.presentToast('Added to wishlist');
        }, error => {
            try {
                this.utils.presentToast(error.error.error[0]);
            } catch (e) {
                this.utils.presentToast('Some Error Occured');
            }
            if (error.status === 401) {
                this.router.navigate(['tabs/login']);

            }
        });
    }

    doRefresh(event) {
        this.route.queryParams.subscribe(params => {
            if (params && params.special) {
                this.special = JSON.parse(params.special);
                // this.get_wish_list(this.special);
                event.target.complete();
            }
        });
    }


}
