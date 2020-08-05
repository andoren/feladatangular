import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { LoginComponent } from './components/pages/login/login.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { MenuItemComponent } from './components/header/menu-item/menu-item.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { ProductItemComponent } from './components/pages/products/product-item/product-item.component';
import { FooterComponent } from './components/footer/footer.component';
import { NewproductComponent } from './components/pages/newproduct/newproduct.component';
import { NonauthproductsComponent } from './components/pages/nonauthproducts/nonauthproducts.component';
import { MyproductsComponent } from './components/pages/myproducts/myproducts.component';
import { ProductComponent } from './components/pages/product/product.component';
import { UsersComponent } from './components/pages/users/users.component';
import { UserItemComponent } from './components/pages/users/user-item/user-item.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { SumpageComponent } from './components/pages/sumpage/sumpage.component';
import { ModifyuserComponent } from './components/pages/users/modifyuser/modifyuser.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AddresspopupComponent } from './components/addresspopup/addresspopup.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    LoginComponent,
    MenuItemComponent,
    RegisterComponent,
    ProductItemComponent,
    FooterComponent,
    NewproductComponent,
    NonauthproductsComponent,
    MyproductsComponent,
    ProductComponent,
    UsersComponent,
    UserItemComponent,
    ContactComponent,
    SumpageComponent,
    ModifyuserComponent,
    SpinnerComponent,
    AddresspopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()

  ],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
