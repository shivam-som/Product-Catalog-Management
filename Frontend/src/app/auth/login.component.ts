import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
    selector: 'app-login', template: `
<div class="row justify-content-center"><div class="col-4">
<h3>Login</h3>
<form (ngSubmit)="login()">
<div class="mb-2"><input class="form-control" [(ngModel)]="email" name="email" placeholder="Email"></div>
<div class="mb-2"><input type="password" class="form-control" [(ngModel)]="password" name="password" placeholder="Password"></div>
<button class="btn btn-primary">Login</button>
</form>
</div></div>
` })
export class LoginComponent {
    email = ''; password = '';
    constructor(private auth: AuthService, private router: Router) { }
    async login() {
        try { await this.auth.login(this.email, this.password); this.router.navigate(['/products']); }
        catch (e) { alert('Login failed'); }
    }
}