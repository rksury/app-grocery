import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {ProductService} from './product.service';
import {CartService} from '../cart/cart.service';
import {UtilsService} from '../utils.service';
import {FormControl, FormGroup} from '@angular/forms';
import {CategoryService} from '../category/category.service';

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
    showProducts = true;
    special;
    categories: {};
    products;
    showCategories = true;

    constructor(private route: ActivatedRoute, private router: Router,
                private productService: ProductService, private categoryService: CategoryService,
                private cartService: CartService,
                private utils: UtilsService) {
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
        this.get_categories();
    }

    get_categories() {
        this.categoryService.getCategories().subscribe(data => {
            this.categories = data;
        }, error => {
            try {
                this.utils.presentToast(error.error.error[0]);
            } catch (e) {
                // this.utils.presentToast('Some Error Occurred');

            }
        });
    }
    get_subcategory(pk) {
        this.categoryService.getSubCategories(pk).subscribe(data => {
            this.categories = data;
        }, error => {
            try {
                if (error.status === 404) {
                    this.utils.presentToast('No Subcategory found.');
                } else {
                    this.utils.presentToast(error.error.error[0]);
                }
            } catch (e) {
                this.utils.presentToast('Some Error Occurred');

            }
        });
    }

    get_subcategory_products(pk) {
        const params = {category: pk};
        const navigationExtras: NavigationExtras = {
            queryParams: {
                special: JSON.stringify(params)
            }
        };
        this.router.navigate(['/tabs/products'], navigationExtras);
    }


    ionViewWillEnter() {
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
        this.productService.get_all_products().subscribe(data => {
                this.showProducts = true;
                this.products = data;

            }, error => {
                this.showProducts = false;
            }
        );
    }

    get_products(params) {
        this.productService.get_products(params).subscribe(data => {
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
