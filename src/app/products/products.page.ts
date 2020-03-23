import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from './product.service';
import {CartService} from '../cart/cart.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.page.html',
    styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
    special;
    products;

    constructor(private route: ActivatedRoute,
                private producteService: ProductService,
                private cartService: CartService) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if (params && params.special) {
                this.special = JSON.parse(params.special);
                this.get_products(this.special);
            }
        });
    }

    get_products(params) {
        console.log('params');
        this.producteService.get_products(params).subscribe(data => {
            this.products = data;
        });
    }

    add_to_cart(pk) {
        this.cartService.add_to_cart(pk).subscribe(data => {
            console.log(data);
        }, error => {
            console.log(error);
        });
    }

}
