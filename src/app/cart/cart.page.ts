import {Component, OnInit} from '@angular/core';
import {CartService} from './cart.service';
import {UtilsService} from '../utils.service';
import {Router} from '@angular/router';

declare var RazorpayCheckout: any;

@Component({
    selector: 'app-cart',
    templateUrl: './cart.page.html',
    styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
    cart = {
        id: 0,
        products: [{
            id: null,
            product: {
                id: null,
                image: null,
                item_name: null,
                brand_name: null,
                weight: null,
                item_cp: null,
                unit: null,
                selling_price: null,
                discount: null,
                cash_back: null,
                final_price: null,
                is_featured: false,
                new_arrival: false,
                last_updated: null,
                category: 1
            },
            total_price: null,
            quantity: 1
        }],
        total_price: 0,
        final_price: 0,
        cash_back: 0,
        is_checked_out: false,
        user: 0,
        coupon: null
    };
    products;
    isloggedin = window.localStorage.getItem('token') !== null;
    showcart = true;


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
                this.showcart = true;
            }, error => {
                this.cart = {
                    id: 0,
                    products: [{
                        id: null,
                        product: {
                            id: null,
                            image: null,
                            item_name: null,
                            brand_name: null,
                            weight: null,
                            item_cp: null,
                            unit: null,
                            selling_price: null,
                            discount: null,
                            cash_back: null,
                            final_price: null,
                            is_featured: false,
                            new_arrival: false,
                            last_updated: null,
                            category: 1
                        },
                        total_price: null,
                        quantity: 1
                    }],
                    total_price: 0,
                    final_price: 0,
                    cash_back: 0,
                    is_checked_out: false,
                    user: 0,
                    coupon: null
                };
                this.showcart = false;
                this.products = {};
                if (error.status === 404) {
                    this.showcart = false;
                    this.products = {};
                } else if (error.status === 401) {

                } else {
                    try {
                        this.utils.presentToast(error.error.error[0]);
                    } catch (e) {
                        // this.utils.presentToast('Some Error Occurred');

                    }

                }
            }
        );
    }

    place_order() {
        this.cartService.place_order().subscribe(data => {
            // this.getCart();
            this.utils.presentToast('Order Placed.');
            this.router.navigate(['/tabs/order-history']);

        }, error => {
            try {
                this.utils.presentToast(error.error.error[0]);
            } catch (e) {
                // this.utils.presentToast('Some Error Occurred');

            }
        });
    }

    add_product(id) {
        this.cartService.add_item(id).subscribe(data => {
            this.cart = data;
            this.products = this.cart.products;
        }, error => {
            try {
                this.utils.presentToast(error.error.error[0]);
            } catch (e) {
                this.utils.presentToast('Some Error Occurred');

            }
        });
    }

    remove_product(id) {
        this.cartService.remove_item(id).subscribe(data => {
            this.cart = data;
            this.products = this.cart.products;
        }, error => {
            this.getCart();
            try {
                this.utils.presentToast(error.error.error[0]);
            } catch (e) {
                this.utils.presentToast('Some Error Occurred');
            }
        });
    }

    payWithRazor() {
        const options = {
            description: 'Checkout',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR', // your 3 letter currency code
            key: 'rzp_test_2nAiN0h9QN68NR', // your Key Id from Razorpay dashboard
            amount: this.cart.final_price * 100, // Payment amount in smallest denomiation e.g. cents for USD
            name: 'The Saving Bazaar',
            theme: {
                color: '#F37254'
            },
            modal: {
                ondismiss() {
                    alert('dismissed');
                }
            }
        };
        const successCallback = (paymentid) => {
            this.cartService.capture_payment(paymentid).subscribe(data => {
                this.place_order();
            }, error => {
                try {
                    this.utils.presentToast(error.error.error[0]);
                } catch (e) {
                    this.utils.presentToast('Some Error Occurred');

                }

            });
            alert('payment_id: ' + paymentid);
        };

        const cancelCallback = (error) => {
            alert(error.description + ' (Error ' + error.code + ')');
        };

        RazorpayCheckout.open(options, successCallback, cancelCallback);
    }

    doRefresh(ev) {
        this.getCart();
        ev.target.complete();
    }
}
