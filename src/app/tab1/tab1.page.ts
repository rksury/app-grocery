import {Component, OnInit} from '@angular/core';
import {HomeService} from './home.service';
import {NavigationExtras, Router} from '@angular/router';
import {UtilsService} from '../utils.service';
import {TabsPage} from '../tabs/tabs.page';
import {CartService} from '../cart/cart.service';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
    categories: {};
    params: {};
    HomeOffers: [];
    FeatureProducts: [];
    NewArrivals: [];
    showNewarrivals;

    constructor(private homeService: HomeService,
                private cartService: CartService,
                private router: Router,
                private utils: UtilsService,
                private tabPage: TabsPage) {
    }

    // ionViewWillEnter() {
    //     this.get_categories();
    //     this.tabPage.refresh();
    //     this.getHomeOffers();
    // }

    ngOnInit() {
        this.get_categories();
        this.tabPage.refresh();
        this.getHomeOffers();
        this.featuredProducts();
        this.newArrivals();
    }

    get_categories() {
        this.homeService.getCategories().subscribe(data => {
                this.categories = data;
            },
            // tslint:disable-next-line:no-shadowed-variable
            error => {
                // this.utils.presentToast('Some Error Occurred');
            });
    }

    open_category_products(pk) {
        this.params = {parentcategory: pk};
        const navigationExtras: NavigationExtras = {
                queryParams: {
                    special: JSON.stringify(this.params)
                }
            }
        ;
        this.router.navigate(['/tabs/products'], navigationExtras);
    }

    getHomeOffers() {
        this.homeService.getHomeOffers().subscribe(data => {
            this.HomeOffers = data;
        });
    }
    featuredProducts() {
        this.homeService.getFeaturedproducts().subscribe(data => {
           this.FeatureProducts = data;
        });
    }
    newArrivals() {
        this.homeService.getNewarrival().subscribe(data => {
            this.NewArrivals = data;
        });
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
}
