import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class WishlistService {
    base_url = environment.base_url;

    constructor(private httpClient: HttpClient) {
    }

    get_wishlist() {
        const httpOptions = {
            headers: new HttpHeaders({
                    Authorization: 'Bearer ' + window.localStorage.getItem('token')
                }
            )
        };
        return this.httpClient.get(this.base_url + 'product/wishlist', httpOptions);
    }

    add_To_wishlist(id): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                    Authorization: 'Bearer ' + window.localStorage.getItem('token')
                }
            )
        };
        return this.httpClient.post(this.base_url + 'product/wishlist/' + id, {}, httpOptions);
    }

    // remove_from_Wishlist(id) {
    //     const data = {product: id, Quantity: 1};
    //     const httpOptions = {
    //         headers: new HttpHeaders({
    //                 Authorization: 'Bearer ' + window.localStorage.getItem('token')
    //             }
    //         )
    //     };
    //     // @ts-ignore
    //     return this.httpClient.delete(this.base_url + 'product/wishlist/<int:product_id>', data, httpOptions);
    // }

}
