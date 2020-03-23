import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from './product.service';
import {CartService} from '../cart/cart.service';
import {UtilsService} from '../utils.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-products',
    templateUrl: './products.page.html',
    styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
    submitform = new FormGroup({
        Quantity: new FormControl(''),
        pk: new FormControl(''),
    });

    special;
    products;

    constructor(private route: ActivatedRoute,
                private producteService: ProductService,
                private cartService: CartService,
                private utils: UtilsService) {
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
        this.producteService.get_products(params).subscribe(data => {
                this.products = data;
            }, error => {
                console.error(error);
                this.utils.presentToast('Some Error Occurred');
            }
        );
    }

    add_to_cart(pk) {
        const quantity = this.submitform.value.Quantity;
        this.cartService.add_to_cart(pk, quantity).subscribe(data => {
            this.utils.presentToast('Added to cart.');
        }, error => {
            console.error(error);

            this.utils.presentToast('Some Error Occurred');
        });
    }

    onSubmit() {
        console.log(this.submitform.value);
    }

}
