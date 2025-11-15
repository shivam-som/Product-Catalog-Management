import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
@Injectable({ providedIn: 'root' })
export class ProductService {
    constructor(private api: ApiService) { }
    list(params?: any) { return this.api.get('products', params); }
    get(id: string) { return this.api.get(`products/${id}`); }
    create(form: FormData) { return this.api.postForm('products', form); }
    update(id: string, form: FormData) { return this.api.postForm(`products/${id}`, form); }
}