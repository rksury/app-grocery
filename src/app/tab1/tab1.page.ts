import {Component} from '@angular/core';
import {HomeService} from './home.service';
import {NavigationExtras, Router} from '@angular/router';
import {UtilsService} from '../utils.service';
import {TabsPage} from '../tabs/tabs.page';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
    categories: {};
    params: {}

    constructor(private homeService: HomeService,
                private router: Router,
                private utils: UtilsService,
                private tabPage: TabsPage) {
    }

    ionViewWillEnter() {
        this.get_categories();
        this.tabPage.refresh();
    }

    get_categories() {
        this.homeService.getCategories().subscribe(data => {
                this.categories = data;
            },
            // tslint:disable-next-line:no-shadowed-variable
            error => {
                this.utils.presentToast('Some Error Occurred');
            });
    }

    open_category_products(pk) {
        this.params = {parentcategory: pk}
        const navigationExtras: NavigationExtras = {
                queryParams: {
                    special: JSON.stringify(this.params)
                }
            }
        ;
        this.router.navigate(['/tabs/products'], navigationExtras);
    }
}
