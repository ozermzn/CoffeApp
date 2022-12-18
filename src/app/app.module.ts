import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ProductsComponent } from './products/products.component';
import { WhoUsComponent } from './who-us/who-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NavDirectiveDirective } from './navbar/nav-directive.directive';
import { BlogComponent } from './blog/blog.component';
import { AppRoutingModule } from './app-routing.module';
import { CreateComponent } from './create/create.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { PermComponent } from './perm/perm.component';
import { BasketComponent } from './basket/basket.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    ProductsComponent,
    WhoUsComponent,
    ContactUsComponent,
    NavDirectiveDirective,
    BlogComponent,
    CreateComponent,
    ProductDetailsComponent,
    AuthenticationComponent,
    PermComponent,
    BasketComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
