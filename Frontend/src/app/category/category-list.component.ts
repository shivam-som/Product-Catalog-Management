import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';


@Component({
    selector: 'app-category-list', template: `
<div>
<h3>Categories</h3>
<ul class="list-group">
<li *ngFor="let c of categories" class="list-group-item">{{c.name}}</li>
</ul>
<form (ngSubmit)="add()" class="mt-3">
<input class="form-control" [(ngModel)]="name" name="name" placeholder="New category">
<button class="btn btn-primary mt-2">Add</button>
</form>
</div>
` })
export class CategoryListComponent implements OnInit {
    categories: any[] = [];
    name = '';
    constructor(private svc: CategoryService) { }
    ngOnInit() { this.load(); }
    load() { this.svc.list().subscribe((res: any) => this.categories = res); }
    add() { this.svc.create(this.name).subscribe(() => { this.name = ''; this.load(); }); }
}