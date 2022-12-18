import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth.service';
import { BasketService } from 'src/app/basket/basket.service';
import { ProductModel } from 'src/app/create/product.model';
import { ProductsService } from 'src/app/create/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: ProductModel | undefined;
  products: ProductModel[] = [];
  loading: boolean = true;
  isAuth: boolean = false;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private basketService: BasketService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
    this.route.params.subscribe((p) => {
      const id = p['productId'];
      this.productService.getProductId(id).subscribe((result) => {
        this.product = { ...result, id: id };
      });
    });
    this.route.params.subscribe((p) => {
      this.productService.getProducts(p['categoryId']).subscribe((data) => {
        for (const key in data) {
          this.products = data.slice(0, 3);
        }
      });
    });
    this.authService.user.subscribe((user) => {
      this.isAuth = !!user;
      console.log(this.isAuth);
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
