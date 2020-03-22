import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HomeService {
    base_url = environment.base_url;


    constructor(private httpclient: HttpClient) {
    }

    getCategories() {
        return this.httpclient.get(this.base_url + 'product/categories');
    }
}
