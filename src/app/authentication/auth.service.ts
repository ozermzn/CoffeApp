import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { AuthResponse } from './auth.response';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  api_key = 'AIzaSyDKXmXsMpOTr5x5zvOxXhXPCFV6g94KaaE';

  user = new BehaviorSubject<User | null>(null);
  register(email: string, password: string) {
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          this.api_key,
        {
          email: email,
          password: password,
          returnsecureToken: true,
        }
      )
      .pipe(
        tap((data) => {
          this.handleUser(
            data.email,
            data.localId,
            data.idToken,
            data.expiresIn
          );
        }),
        catchError(this.handleError)
      );
  }
  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          this.api_key,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        tap((data) => {
          this.handleUser(
            data.email,
            data.localId,
            data.idToken,
            data.expiresIn
          );
        }),
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse) {
    let message = 'There is a mistake!';
    if (err.error.error) {
      switch (err.error.error.message) {
        case 'EMAIL_NOT_FOUND':
          message = 'Email cannot found.';
          break;
        case 'INVALID_PASSWORD':
          message = 'Invalid password';
          break;
        case 'USER_DISABLED':
          message = 'Your account is blocked.';
          break;
        case 'EMAIL_EXISTS':
          message = 'This email already use.';
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.':
          message = 'You have made too many requests, try again later. ';
          break;
      }
    }
    return throwError(() => message);
  }
  autoLogin() {
    if (localStorage.getItem('user') == null) {
      return;
    }
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const loadedUser = new User(
      user.email,
      user.id,
      user._token,
      new Date(user.tokenExpirationDate)
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }
  private handleUser(
    email: string,
    localId: string,
    tokenId: string,
    expiresIn: string
  ) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, localId, tokenId, expirationDate);
    this.user.next(user);
    localStorage.setItem('user', JSON.stringify(user));
    console.log(user);
  }
  logout() {
    this.user.next(null);
    localStorage.removeItem('user');
  }
}
