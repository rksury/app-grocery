import {Component, OnInit} from '@angular/core';
import {OrderService} from '../order-history/order.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-oder-details',
    templateUrl: './oder-details.page.html',
    styleUrls: ['./oder-details.page.scss'],
})
export class OderDetailsPage implements OnInit {
    order = {};
    showOrder = false;

    constructor(private orderService: OrderService,
                private  route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.route.paramMap.subscribe(params => {
            if (params && params.get('id')) {
                this.orderService.getOrder(params.get('id')).subscribe(data => {
                    this.order = data;
                    this.showOrder = true;
                });
            }
        });
    }

}
