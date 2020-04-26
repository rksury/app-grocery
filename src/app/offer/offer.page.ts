import { Component, OnInit } from '@angular/core';
import {HomeService} from '../tab1/home.service';
import {CartService} from "../cart/cart.service";
import {UtilsService} from "../utils.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../products/product.service";

@Component({
  selector: 'app-offer',
  templateUrl: './offer.page.html',
  styleUrls: ['./offer.page.scss'],
})
export class OfferPage implements OnInit {
     showProducts = true;
 HomeOffers: [];
 showHomeoffers = true;
 special;
    products;
  constructor(private homeService: HomeService, private cartService: CartService,
              private productService: ProductService, private utils: UtilsService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
     this.getHomeOffers();
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
  getHomeOffers() {
        this.homeService.getHomeOffers().subscribe(data => {
            this.HomeOffers = data;
        });
    }

    addTocart(pk) {
        this.cartService.add_to_cart(pk).subscribe(data => {
            this.utils.presentToast('Added to cart.');
        }, error => {
            try {
                this.utils.presentToast(error.error.error[0]);
            } catch (e) {
                //this.utils.presentToast('Some Error Occurred');

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
