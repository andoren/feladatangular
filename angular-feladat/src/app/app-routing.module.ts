import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import {ProductsComponent} from './components/pages/products/products.component';
import { NewproductComponent } from './components/pages/newproduct/newproduct.component';
import { NonauthproductsComponent } from './components/pages/nonauthproducts/nonauthproducts.component';
import {MyproductsComponent} from './components/pages/myproducts/myproducts.component'
import { ProductComponent } from './components/pages/product/product.component';
import {UsersComponent} from './components/pages/users/users.component'
import { ContactComponent } from './components/pages/contact/contact.component';
import { SumpageComponent } from './components/pages/sumpage/sumpage.component';
import { ModifyuserComponent } from './components/pages/users/modifyuser/modifyuser.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
const routes: Routes = [
  {path:'',component:ProductsComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'newproduct',component:NewproductComponent},
  {path:'notauthproducts',component:NonauthproductsComponent},
  {path:'myproducts',component:MyproductsComponent},
  {path:'product/:id',component:ProductComponent},
  {path:'getusers',component:UsersComponent},
  {path:'contact',component:ContactComponent},
  {path:'sumpage/:id',component:SumpageComponent},
  {path:'modifyuser/:id',component:ModifyuserComponent},
  {path:'spinner',component:SpinnerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
