import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, timeInterval } from 'rxjs';
import { AuthResponse } from './auth.response';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
  error: string = '';
  model: any = {};
  isLogin: boolean = true;
  loading: boolean = true;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
  handleAuth(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let authResponse: Observable<AuthResponse>;
    if (this.isLogin) {
      authResponse = this.authService.login(email, password);
      document.getElementById('loginPage')?.classList.add('hide');
      document.getElementById('loginSuccess')?.classList.remove('hide');
    } else {
      authResponse = this.authService.register(email, password);
      console.log('Kayıt edildi');
    }
    authResponse.subscribe({
      next: (response) => {
        setTimeout(() => {
          this.router.navigate(['/home']);
          console.log(response);
          document.getElementById('loginPage')?.classList.remove('hide');
          document.getElementById('loginSuccess')?.classList.add('hide');
        }, 1000);
      },
      error: (err) => {
        this.error = err;
      },
    });
  }
  logOrReg() {
    this.isLogin = !this.isLogin;
  }
}
