import {Component, OnInit} from '@angular/core';
import {CartService} from './cart.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.page.html',
    styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
    cart;
    products;

    constructor(private cartService: CartService) {
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
            }
        );
    }


    update_quantity() {
        console.log('dsad');
    }
}
