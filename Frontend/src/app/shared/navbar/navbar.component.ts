import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
    selector: 'app-navbar', template: `
<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
<div class="container">
<a class="navbar-brand" routerLink="/">ProductApp</a>
<div class="collapse navbar-collapse">
<ul class="navbar-nav me-auto">
<li class="nav-item"><a class="nav-link" routerLink="/products">Products</a></li>
<li class="nav-item"><a class="nav-link" routerLink="/categories">Categories</a></li>
<li class="nav-item"><a class="nav-link" routerLink="/upload">Bulk Upload</a></li>
</ul>
<ul class="navbar-nav ms-auto">
<li class="nav-item" *ngIf="!auth.isLoggedIn()"><a class="nav-link" routerLink="/login">Login</a></li>
<li class="nav-item" *ngIf="auth.isLoggedIn()"><a class="nav-link" (click)="logout()">Logout</a></li>
</ul>
</div>
</div>
</nav>
` })
export class NavbarComponent {
    constructor(public auth: AuthService) { }
    logout() { this.auth.logout(); }
}