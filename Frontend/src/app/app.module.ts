import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoginComponent } from './auth/login.component';
import { CategoryListComponent } from './category/category-list.component';
import { CategoryFormComponent } from './category/category-form.component';
import { ProductListComponent } from './product/product-list.component';
import { ProductFormComponent } from './product/product-form.component';
import { UploadComponent } from './upload/upload.component';


import { AuthInterceptor } from './services/auth.interceptor';


@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        LoginComponent,
        CategoryListComponent,
        CategoryFormComponent,
        ProductListComponent,
        ProductFormComponent,
        UploadComponent
    ],
    imports: [BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule, AppRoutingModule],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
    bootstrap: [AppComponent]
})
export class AppModule { }