import {Component} from '@angular/core';
import {HomeService} from './home.service';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
    categories: {}

    constructor(private homeService: HomeService) {
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
    }
}
