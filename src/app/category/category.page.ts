import {Component, OnInit} from '@angular/core';
import {CategoryService} from './category.service';
import {NavigationExtras, Router} from '@angular/router';
import {UtilsService} from '../utils.service';

@Component({
    selector: 'app-category',
    templateUrl: './category.page.html',
    styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
    categories: {};

    constructor(private categoryService: CategoryService,
                private router: Router,
                private utils: UtilsService) {
    }

    ionViewWillEnter() {
        this.get_categories();
    }

    ngOnInit() {

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


    doRefresh(event) {
        this.get_categories();
        event.target.complete();
    }
}
