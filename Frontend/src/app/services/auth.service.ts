import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
    tokenKey = 'auth_token';
    constructor(private api: ApiService) { }
    async login(email: string, password: string) {
        const res: any = await this.api.post('auth/login', { email, password }).toPromise();
        localStorage.setItem(this.tokenKey, res.token);
    }
    logout() { localStorage.removeItem(this.tokenKey); }
    isLoggedIn() { return !!localStorage.getItem(this.tokenKey); }
    getToken() { return localStorage.getItem(this.tokenKey); }
}