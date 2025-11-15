import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
@Injectable({ providedIn: 'root' })
export class CategoryService {
    constructor(private api: ApiService) { }
    list() { return this.api.get('categories'); }
    create(name: string) { return this.api.post('categories', { name }); }
}