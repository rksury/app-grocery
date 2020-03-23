import {Component, OnInit} from '@angular/core';
import {CartService} from './cart.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.page.html',
    styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
    products;

    constructor(private cartService: CartService) {
    }

    ngOnInit() {
        this.getCart();
    }

    getCart() {
        this.cartService.getCart().subscribe(
            data => {
                this.products = data;
            }
        );
    }
}
