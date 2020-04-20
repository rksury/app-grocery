import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  base_url = environment.base_url;

  constructor( private httpClient: HttpClient) { }

  add_To_wishlist(pk) {
    const data = {product: pk , Quantity: 1};
    const httpOptions = {
            headers: new HttpHeaders({
                    Authorization: 'Bearer ' + window.localStorage.getItem('token')
                }
            )
        };
    return this.httpClient.post(this.base_url + 'cart/', data , httpOptions);
  }
}
