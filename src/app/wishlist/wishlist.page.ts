import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../products/product.service';
import {CartService} from '../cart/cart.service';
import {UtilsService} from '../utils.service';
import {FormControl, FormGroup} from '@angular/forms';

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

    showProducts = true;
    special;
    products;

    constructor(private route: ActivatedRoute,
                private producteService: ProductService,
                private cartService: CartService,
                private utils: UtilsService,
                private router: Router) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if (params && params.special) {
                this.special = JSON.parse(params.special);
                this.get_products(this.special);
            } else {
                this.get_all_products();

            }
        });
    }

    ionViewWillLeave() {
        this.products = [];
        this.special = {};
    }

    get_all_products() {
        this.producteService.get_all_products().subscribe(data => {
                this.showProducts = true;
                this.products = data;

            }, error => {
                this.showProducts = false;
            }
        );
    }

    get_products(params) {
        this.producteService.get_products(params).subscribe(data => {
                this.showProducts = true;
                this.products = data;

            }, error => {
                this.showProducts = false;
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
                this.utils.presentToast('Some Error Occurred');

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
                this.get_products(this.special);
                event.target.complete();
            }
        });
    }

}
