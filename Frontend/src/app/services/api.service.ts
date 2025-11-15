import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class ApiService {
    base = environment.apiUrl;
    constructor(private http: HttpClient) { }
    get(path: string, params?: any) {
        let p = new HttpParams();
        if (params) Object.keys(params).forEach(k => p = p.set(k, params[k]));
        return this.http.get(`${this.base}/${path}`, { params: p });
    }
    post(path: string, body: any) { return this.http.post(`${this.base}/${path}`, body); }
    put(path: string, body: any) { return this.http.put(`${this.base}/${path}`, body); }
    delete(path: string) { return this.http.delete(`${this.base}/${path}`); }
    postForm(path: string, form: FormData) { return this.http.post(`${this.base}/${path}`, form); }
}