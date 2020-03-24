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

    add_to_cart(pk, q) {
        const data = {product: pk, quantity: 1, package: q};
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
}
