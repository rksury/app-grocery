import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from './product.service';
import {CartService} from '../cart/cart.service';
import {UtilsService} from '../utils.service';
import {WishlistService} from '../wishlist/wishlist.service';

@Component({
    selector: 'app-product-info',
    templateUrl: './product-info.page.html',
    styleUrls: ['./product-info.page.scss'],
})
export class ProductInfoPage implements OnInit {
    showProducts = true;
    special;
    products;
    product = {
        id: '',
        image: '',
        item_name: '',
        brand_name: '',
        weight: '',
        item_cp: '',
        unit: '',
        selling_price: '',
        discount: '',
        cash_back: '',
        final_price: '',
        category: '',
        in_wish_list: false
    };
    relatedProducts = [];

    constructor(private  route: ActivatedRoute,
                private router: Router,
                private productService: ProductService,
                private cartService: CartService,
                private wishlistService: WishlistService,
                private utils: UtilsService) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.productService.getProduct(params.get('id')).subscribe(data => {
                this.product = data;

            });
            console.log(params.get('id'));
        });
    }

    ionViewWillEnter() {
        this.route.paramMap.subscribe(params => {
            if (params && params.get('id')) {
                this.productService.getProduct(params.get('id')).subscribe(data => {
                    this.product = data.products;
                    this.relatedProducts = data.related_products;
                    console.log(this.relatedProducts);
                });
            }
        });
    }

    get_products(params) {
        this.productService.getProduct(params).subscribe(data => {
                this.showProducts = true;
                this.products = data;

            }, error => {
                this.showProducts = false;
            }
        );
    }

    addTocart(id) {
        this.cartService.add_to_cart(id).subscribe(data => {
            this.utils.presentToast('Added to cart.');
        }, error => {
            try {
                this.utils.presentToast(error.error.error[0]);
            } catch (e) {
                // //this.utils.presentToast('Some Error Occurred');

            }
            if (error.status === 401) {
                this.router.navigate(['tabs/login']);

            }
        });
    }

    addTowishlist(id) {
        this.product.in_wish_list = !this.product.in_wish_list;
        this.wishlistService.add_To_wishlist(id).subscribe(data => {
            this.product = data.products;
        }, error => {
            this.product.in_wish_list = !this.product.in_wish_list;
            try {
                this.utils.presentToast(error.error.error[0]);
            } catch (e) {
                // //this.utils.presentToast('Some Error Occurred');

            }
            if (error.status === 401) {
                this.utils.presentToast('you Have to login first');
                // this.utils.presentToast('you Have to login first');
                this.router.navigate(['tabs/login']);
            }
        });
    }

}
