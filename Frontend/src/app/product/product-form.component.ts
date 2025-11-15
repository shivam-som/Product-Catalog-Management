import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';


@Component({
    selector: 'app-product-form', template: `
<div class="row"><div class="col-6">
<h3>{{id ? 'Edit' : 'New'}} Product</h3>
<form (ngSubmit)="save()">
<input class="form-control mb-2" [(ngModel)]="name" name="name" placeholder="Name">
<input class="form-control mb-2" [(ngModel)]="price" name="price" placeholder="Price">
<select class="form-select mb-2" [(ngModel)]="categoryId" name="categoryId">
<option *ngFor="let c of categories" [value]="c.id">{{c.name}}</option>
</select>
<input type="file" (change)="onFile($event)" class="form-control mb-2">
<button class="btn btn-primary">Save</button>
</form>
</div></div>
` })
export class ProductFormComponent implements OnInit {
    id: any; name = ''; price = 0; categoryId = ''; categories: any[] = []; file: any;
    constructor(private svc: ProductService, private catSvc: CategoryService, private route: ActivatedRoute, private router: Router) { }
    ngOnInit() { this.id = this.route.snapshot.paramMap.get('id'); this.catSvc.list().subscribe((r: any) => this.categories = r); if (this.id) this.svc.get(this.id).subscribe((p: any) => { this.name = p.name; this.price = p.price; this.categoryId = p.categoryId; }); }
    onFile(e: any) { this.file = e.target.files[0]; }
    save() { const form = new FormData(); form.append('name', this.name); form.append('price', this.price + ''); form.append('categoryId', this.categoryId); if (this.file) form.append('image', this.file); if (this.id) this.svc.update(this.id, form).subscribe(() => this.router.navigate(['/products'])); else this.svc.create(form).subscribe(() => this.router.navigate(['/products'])); }
}