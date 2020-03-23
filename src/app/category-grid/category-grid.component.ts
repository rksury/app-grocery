import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-category-grid',
    templateUrl: './category-grid.component.html',
    styleUrls: ['./category-grid.component.scss'],
})
export class CategoryGridComponent implements OnInit {
    categories: [{
        id: 1,
        title: 'pcat1',
        image: 'http://127.0.0.1:8000/media/categories/bg2.jpg',
        backgroud_color: '#3272fa'
    },
        {
            id: 2, title: 'etset',
            image: 'http://127.0.0.1:8000/media/categories/bg2_Eyzn4ub.jpg',
            backgroud_color: '#34eb37'
        }];

    constructor() {
    }

    ngOnInit() {
    }

}
