import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { basketModel } from '../basket/basket.model';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isAuth: boolean = false;
  baskets: basketModel[] = [];
  constructor(
    private authService: AuthService,
    private basketService: BasketService
  ) {}

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.isAuth = !!user;
    });
    this.basketService.getBasketItem().subscribe((data) => {
      console.log(data);
      this.baskets = data;
    });
  }
  logout() {
    this.authService.logout();
  }
  // removeBasketItem(basket: any) {
  //   this.basketService.deleteBasketItem(basket).subscribe((data) => {
  //     console.log(data);
  //   });
  // }

  hideOrShow(id: any, id2: any) {
    id.classList.contains('hide')
      ? id.classList.remove('hide')
      : id.classList.add('hide');
    id2.classList.contains('hide')
      ? id2.classList.remove('hide')
      : id2.classList.add('hide');
  }
}
