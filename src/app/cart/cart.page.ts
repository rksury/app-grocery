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
    cart;
    products;
    isloggedin = window.localStorage.getItem('token') !== null;
    showcart = false;


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
                // this.cart = {};
                this.showcart = false;
                this.products = {};
                if (error.status === 404) {
                    this.utils.presentToast('Please add items to cart first');
                } else {
                    this.utils.presentToast('Some Error Occurred');
                }
            }
        );
    }

    place_order() {
        this.cartService.place_order().subscribe(data => {
            // this.getCart();
            this.utils.presentToast('Order Placed.');

        }, error => {
            this.utils.presentToast('Some error Occured');
        });
    }

    payWithRazor() {
        let options = {
            description: 'Checkout',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR', // your 3 letter currency code
            key: 'rzp_test_2nAiN0h9QN68NR', // your Key Id from Razorpay dashboard
            amount: this.cart.discounted_price * 100, // Payment amount in smallest denomiation e.g. cents for USD
            name: 'foo',
            // prefill: {
            //     email: 'admin@enappd.com',
            //     contact: '9621323231',
            //     name: 'Enappd'
            // },
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
                this.utils.presentToast('Some error Occured');

            });
            alert('payment_id: ' + paymentid);
        };

        const cancelCallback = (error) => {
            alert(error.description + ' (Error ' + error.code + ')');
        };

        RazorpayCheckout.open(options, successCallback, cancelCallback);
    }

    update_quantity() {
        console.log('dsad');
    }

}
