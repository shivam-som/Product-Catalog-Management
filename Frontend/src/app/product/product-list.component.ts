import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';


@Component({
    selector: 'app-product-list', template: `
<div>
<div class="d-flex mb-2">
<input class="form-control me-2" placeholder="Search" [(ngModel)]="search" (ngModelChange)="load()">
<select class="form-select me-2" [(ngModel)]="category" (change)="load()">
<option value="">All</option>
<option *ngFor="let c of categories" [value]="c.name">{{c.name}}</option>
</select>
<select class="form-select" [(ngModel)]="sort" (change)="load()">
<option value="asc">Price ↑</option>
<option value="desc">Price ↓</option>
</select>
</div>


<table class="table table-striped">
<thead><tr><th>Name</th><th>Price</th><th>Category</th></tr></thead>
<tbody>
<tr *ngFor="let p of products"> <td>{{p.name}}</td> <td>{{p.price}}</td> <td>{{p.Category?.name}}</td> </tr>
</tbody>
</table>


<nav *ngIf="total > limit">
<ul class="pagination">
<li class="page-item" [class.disabled]="page<=1"><a class="page-link" (click)="setPage(page-1)">Prev</a></li>
<li class="page-item"><a class="page-link">{{page}}</a></li>
<li class="page-item" [class.disabled]="page*limit>=total"><a class="page-link" (click)="setPage(page+1)">Next</a></li>
</ul>
</nav>
</div>
` })
export class ProductListComponent implements OnInit {
    products: any[] = [];
    categories: any[] = [];
    search = ''; category = ''; sort = 'asc'; page = 1; limit = 10; total = 0;
    constructor(private svc: ProductService, private catSvc: CategoryService) { }
    ngOnInit() { this.catSvc.list().subscribe((r: any) => this.categories = r); this.load(); }
    load() { this.svc.list({ page: this.page, limit: this.limit, search: this.search, category: this.category, sort: this.sort }).subscribe((res: any) => { this.products = res.data; this.total = res.total; }); }
    setPage(p: number) { if (p < 1) return; this.page = p; this.load(); }
}