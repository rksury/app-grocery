import {Component, OnInit} from '@angular/core';
import {CartService} from './cart.service';
import {UtilsService} from '../utils.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.page.html',
    styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
    cart;
    products;

    constructor(private cartService: CartService, private utils: UtilsService) {
    }

    ngOnInit() {
        this.getCart();
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
