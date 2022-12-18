import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { ProductsComponent } from './products/products.component';
import { CreateComponent } from './create/create.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { PermComponent } from './perm/perm.component';
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: 'products/create-product', component: CreateComponent },
  { path: 'products/:productId', component: ProductDetailsComponent },
  { path: 'categories/:categoryId', component: ProductsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'auth', component: AuthenticationComponent },
  {
    path: 'blog',
    component: BlogComponent,
  },
  { path: 'products', component: ProductsComponent },
  { path: 'perm', component: PermComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
