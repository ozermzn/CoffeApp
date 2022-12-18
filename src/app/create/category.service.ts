import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, Observable, take, tap } from 'rxjs';
import { AuthService } from '../authentication/auth.service';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  url: string = 'https://coffeapp-ba525-default-rtdb.firebaseio.com/';
  constructor(private http: HttpClient, private authService: AuthService) {}

  getCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url + 'categories.json').pipe(
      map((data) => {
        const category: Category[] = [];
        for (const key in data) {
          category.push({ ...data[key], id: key });
        }
        return category;
      })
    );
  }

  addCategory(category: Category): Observable<Category> {
    return this.authService.user.pipe(
      take(1),
      tap((user) => console.log(user)),
      exhaustMap((user) => {
        return this.http.post<Category>(
          this.url + 'categories.json?auth=' + user?.token,
          category
        );
      })
    );
  }
}
