import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, Observable, take, tap } from 'rxjs';
import { AuthService } from '../authentication/auth.service';
import { basketModel } from './basket.model';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  url: string = 'https://coffeapp-ba525-default-rtdb.firebaseio.com/';
  getBasketItem(): Observable<basketModel[]> {
    return this.http.get<basketModel[]>(this.url + 'baskets.json').pipe(
      map((data) => {
        const category: basketModel[] = [];
        for (const key in data) {
          category.push({ ...data[key], id: key });
        }
        return category;
      })
    );
  }
  addBasketItem(basket: basketModel): Observable<basketModel> {
    return this.authService.user.pipe(
      take(1),
      tap((data) => {
        console.log(data);
      }),
      exhaustMap((user) => {
        return this.http.post<basketModel>(
          this.url + 'baskets.json?auth=' + user?.token,
          basket
        );
      })
    );
  }
  // deleteBasketItem(basketId: any) {
  //   return this.authService.user.pipe(
  //     take(1),
  //     tap((data) => console.log(data)),
  //     exhaustMap((user) => {
  //       return this.http.delete(
  //         this.url + 'baskets.json?auth=' + user?.token,
  //         basketId
  //       );
  //     })
  //   );
  // }
}
