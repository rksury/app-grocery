import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    baseUrl = environment.base_url;

    constructor(private httpClient: HttpClient) {
    }

    getProduct(id): Observable<any> {
        console.log(id);
        return this.httpClient.get(this.baseUrl + 'product/' + id);
    }
}
