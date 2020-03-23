import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    base_url = environment.base_url;

    constructor(private httpclient: HttpClient
    ) {
    }

    get_products(params) {
        return this.httpclient.get(this.base_url + 'product/', { params});
    }


}
