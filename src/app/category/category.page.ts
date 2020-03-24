import {Component, OnInit} from '@angular/core';
import {CategoryService} from './category.service';
import {NavigationExtras, Router} from "@angular/router";

@Component({
    selector: 'app-category',
    templateUrl: './category.page.html',
    styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
    categories: {}

    constructor(private categoryService: CategoryService,
                private router: Router) {
    }

    ionViewWillEnter() {
        this.get_categories();
    }

    ngOnInit() {
    }

    get_categories() {
        this.categoryService.getCategories().subscribe(data => {
            this.categories = data;
        });
    }

    get_subcategory(pk) {
        this.categoryService.getSubCategories(pk).subscribe(data => {
            this.categories = data;
        });
    }

    get_subcategory_products(pk) {
        const params = {category: pk}
        const navigationExtras: NavigationExtras = {
                queryParams: {
                    special: JSON.stringify(params)
                }
            }
        ;
        this.router.navigate(['/tabs/products'], navigationExtras);
    }


}
