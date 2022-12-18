import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { basketModel } from '../basket/basket.model';
import { BasketService } from '../basket/basket.service';
import { ProductModel } from '../create/product.model';
import { ProductsService } from '../create/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  loading: boolean = true;
  products: ProductModel[] = [];
  baskets: basketModel[] = [];
  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private basketService: BasketService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((p) => {
      this.productService.getProducts(p['categoryId']).subscribe((data) => {
        this.products = data.slice(data.length - 3, data.length).reverse();
      });
    });
    this.basketService.getBasketItem().subscribe((data) => {
      this.baskets = data;
      console.log(data);
    });
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}
