import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {
    base_url = environment.base_url;

    constructor(private httpclient: HttpClient) {
    }

    Register(payload) {
        return this.httpclient.post(this.base_url + 'auth/register', payload);
    }
}
