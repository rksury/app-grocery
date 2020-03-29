import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    baseUrl = environment.base_url;

    constructor(private httpClient: HttpClient) {
    }

    getOrders() {
        const httpOptions = {
            headers: new HttpHeaders({
                    Authorization: 'Bearer ' + window.localStorage.getItem('token')
                }
            )
        };
        return this.httpClient.get(this.baseUrl + 'cart/order', httpOptions);
    }

    getOrder(pk) {
        const httpOptions = {
            headers: new HttpHeaders({
                    Authorization: 'Bearer ' + window.localStorage.getItem('token')
                }
            )
        };
        return this.httpClient.get(this.baseUrl + 'cart/order/' + pk, httpOptions);
    }
}
