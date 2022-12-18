import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { exhaustMap, map, Observable, take, tap } from 'rxjs';
import { AuthService } from '../authentication/auth.service';
import { ProductModel } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  url = 'https://coffeapp-ba525-default-rtdb.firebaseio.com/';
  api_key = 'AIzaSyDKXmXsMpOTr5x5zvOxXhXPCFV6g94KaaE';
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  getProducts(categoryId?: any): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.url + 'product.json').pipe(
      map((data) => {
        const products: ProductModel[] = [];
        for (const key in data) {
          if (categoryId) {
            if (categoryId == data[key].categoryId) {
              products.push({ ...data[key], id: key });
            }
          } else {
            products.push({ ...data[key], id: key });
          }
        }

        return products;
      })
    );
  }

  createProduct(product: ProductModel): Observable<ProductModel> {
    return this.authService.user.pipe(
      take(1),
      tap((user) => {
        console.log(user);
      }),
      exhaustMap((user) => {
        return this.http.post<ProductModel>(
          this.url + 'product.json?auth=' + user?.token,
          product
        );
      })
    );
  }
  getProductId(id: any): Observable<ProductModel> {
    return this.http.get<ProductModel>(this.url + 'product/' + id + '.json');
  }
}
