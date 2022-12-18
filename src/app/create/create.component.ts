import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from './category.model';
import { CategoryService } from './category.service';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  constructor(
    private productService: ProductsService,
    private router: Router,
    private categoryService: CategoryService
  ) {}
  model: any = {
    categoryId: 0,
  };
  categories: Category[] = [];
  swapProduct: boolean = true;
  ngOnInit(): void {
    this.categoryService.getCategory().subscribe((data) => {
      this.categories = data;
    });
  }

  saveProduct() {
    const product = {
      name: this.model.name,
      description: this.model.description,
      price: this.model.price,
      imageUrl: this.model.imageUrl,
      categoryId: this.model.categoryId,
      isActive: this.model.isActive,
    };
    this.productService
      .createProduct(product)
      .subscribe((data) => this.router.navigate(['/products']));
  }
  saveCategory(form: NgForm) {
    const category: Category = {
      name: form.value.name,
    };
    this.categoryService
      .addCategory(category)
      .subscribe((data) => this.router.navigate(['/products']));
  }
  swap() {
    this.swapProduct = !this.swapProduct;
  }
}
