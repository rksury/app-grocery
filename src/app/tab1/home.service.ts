import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {retry} from 'rxjs/operators';
import {Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class HomeService {
    base_url = environment.base_url;


    constructor(private httpclient: HttpClient) {
    }

    getCategories() {
        return this.httpclient.get(this.base_url + 'product/categories').pipe(
            retry(3)
        );
    }

    getHomeOffers(): Observable<any> {
        return this.httpclient.get(this.base_url + 'product/home-page-offers').pipe(
            retry(3)
        );
    }
    getFeaturedproducts(): Observable<any> {
        return this.httpclient.get(this.base_url + 'product/featured').pipe(
            retry(3)
        );
    }
    getNewarrival(): Observable<any> {
      return this.httpclient.get(this.base_url + 'product/new-arrival').pipe(
            retry(3)
        );
    }
}
