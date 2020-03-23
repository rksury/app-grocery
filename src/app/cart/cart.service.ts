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

    add_to_cart(pk, quantity) {
        const httpOptions = {
            headers: new HttpHeaders({
                    Authorization: 'Bearer ' + window.localStorage.getItem('token')
                }
            )
        };
        return this.httpclient.post(this.base_url + 'cart/', {quantity: quantity, product: pk}, httpOptions);

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
}
