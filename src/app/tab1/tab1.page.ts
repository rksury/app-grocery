import {Component} from '@angular/core';
import {HomeService} from './home.service';
import {NavigationExtras, Router} from '@angular/router';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
    categories: {};
    params: {}

    constructor(private homeService: HomeService, private router: Router) {
    }

    ionViewWillEnter() {
        this.get_categories();
    }

    get_categories() {
        this.homeService.getCategories().subscribe(data => {
            this.categories = data;
        });
    }

    open_category_products(pk) {
        this.params = { parentcategory: pk }
        const navigationExtras: NavigationExtras = {
                queryParams: {
                    special: JSON.stringify(this.params)
    }
    }
        ;
        this.router.navigate(['/tabs/products'], navigationExtras);
    }
}
