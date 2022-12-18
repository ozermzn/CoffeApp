import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service';
import { basketModel } from '../basket/basket.model';
import { BasketService } from '../basket/basket.service';
import { Category } from '../create/category.model';

import { CategoryService } from '../create/category.service';
import { ProductModel } from '../create/product.model';
import { ProductsService } from '../create/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  isAuth: boolean = false;
  isAdmin: boolean = false;
  loading: boolean = true;
  constructor(
    private productsService: ProductsService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private basketService: BasketService,
    private router: Router
  ) {}
  products: ProductModel[] = [];
  categories: Category[] = [];
  ngOnInit(): void {
    setTimeout(() => (this.loading = false), 1000);
    this.route.params.subscribe((p) => {
      this.productsService.getProducts(p['categoryId']).subscribe((data) => {
        this.products = data.reverse();
      });
    });

    this.categoryService.getCategory().subscribe((data) => {
      this.categories = data;
    });
    this.authService.user.subscribe((user) => {
      this.isAuth = !!user;
      this.isAdmin = user?.email == 'ozer.ramazan@outlook.com.tr';
    });
  }
  addBasket(item: any) {
    const basket = {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
    };
    if (!this.isAuth) {
      this.router.navigate(['/auth']);
      return;
    }
    this.basketService.addBasketItem(basket).subscribe((data) => {
      console.log(data);
    });
  }
}
