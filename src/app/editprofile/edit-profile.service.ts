import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EditProfileService {
    baseUrl = environment.base_url

    constructor(private httpClient: HttpClient) {
    }

    update_user(data) {
        const httpOptions = {
            headers: new HttpHeaders({
                    Authorization: 'Bearer ' + window.localStorage.getItem('token')
                }
            )
        };
        return this.httpClient.patch(this.baseUrl + 'auth/update', data, httpOptions)
    }
}
