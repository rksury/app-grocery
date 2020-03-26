import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    base_url = environment.base_url;

    constructor(private httpclient: HttpClient) {
    }

    add_to_cart(pk) {
        const data = {product: pk, quantity: 1};
        const httpOptions = {
            headers: new HttpHeaders({
                    Authorization: 'Bearer ' + window.localStorage.getItem('token')
                }
            )
        };
        return this.httpclient.post(this.base_url + 'cart/', data, httpOptions);

    }

    getCart() {
        const httpOptions = {
            headers: new HttpHeaders({
                    Authorization: 'Bearer ' + window.localStorage.getItem('token')
                }
            )
        };
        return this.httpclient.get(this.base_url + 'cart/', httpOptions);

    }

    place_order() {
        const httpOptions = {
            headers: new HttpHeaders({
                    Authorization: 'Bearer ' + window.localStorage.getItem('token')
                }
            )
        };
        return this.httpclient.post(this.base_url + 'cart/order', null, httpOptions);
    }

    capture_payment(paymentid) {
        const httpOptions = {
            headers: new HttpHeaders({
                    Authorization: 'Bearer ' + window.localStorage.getItem('token')
                }
            )
        };
        const data = {
            payment_id: paymentid,
            mode: 'RAZORPAY'

        };
        return this.httpclient.post(this.base_url + 'product/capture-payment', data, httpOptions);

    }

    add_item(pk) {
        const httpOptions = {
            headers: new HttpHeaders({
                    Authorization: 'Bearer ' + window.localStorage.getItem('token')
                }
            )
        };
        const data = {id: pk};
        return this.httpclient.post(this.base_url + 'cart/add-item', data, httpOptions)
    }

    remove_item(pk) {
        const httpOptions = {
            headers: new HttpHeaders({
                    Authorization: 'Bearer ' + window.localStorage.getItem('token')
                }
            )
        };
        const data = {id: pk};
        return this.httpclient.post(this.base_url + 'cart/remove-item', data, httpOptions)
    }
}
