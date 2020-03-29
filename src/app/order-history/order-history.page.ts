import {Component, OnInit} from '@angular/core';
import {OrderService} from './order.service';

@Component({
    selector: 'app-order-history',
    templateUrl: './order-history.page.html',
    styleUrls: ['./order-history.page.scss'],
})
export class OrderHistoryPage implements OnInit {
    orders = {};
    showOrders = false

    constructor(private orderService: OrderService) {
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.orderService.getOrders().subscribe(data => {
                this.orders = data;
                this.showOrders = true;
            }
        );
    }

}
