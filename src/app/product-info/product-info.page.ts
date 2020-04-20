import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
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
        category: ''
    };

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
                    this.product = data;
                });
                console.log(params.get('id'));
            }
        });
    }

    AddToCart(id) {
        this.cartService.add_to_cart(id).subscribe(data => {
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

    addTowishlist(pk) {
        this.wishlistService.add_To_wishlist(pk).subscribe(data => {
            this.products = data;
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

}
