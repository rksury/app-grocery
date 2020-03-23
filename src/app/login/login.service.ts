import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class LoginService {
    base_url = environment.base_url;

    constructor(private httpclient: HttpClient) {
    }

    errorHandler(error: HttpErrorResponse) {
        console.log(HttpErrorResponse);
        return {};
    }

    Login(payload) {
        return this.httpclient.post(this.base_url + 'auth/login', payload);
    }

    VerifyLogin() {
        const payload = {token: window.localStorage.getItem('token')};
        return this.httpclient.post(this.base_url + 'auth/verify-token', payload);
    }
}


// .subscribe(data => {
// window.localStorage.setItem('token', data.token);
// window.localStorage.setItem('user', data.user);
// }).pipe(
// catchError(this.handleError)
// }
// }
