import {Injectable} from '@angular/core';
import {retry} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    base_url = environment.base_url

    constructor(private httpClient: HttpClient) {
    }

    getCategories() {
        return this.httpClient.get(this.base_url + 'product/categories').pipe(
            retry(3)
        );
    }

    getSubCategories(pk) {
        return this.httpClient.get(this.base_url + 'product/categories/' + pk).pipe(
            retry(3)
        );

    }
}
