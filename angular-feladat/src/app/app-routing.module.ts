import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import {ProductsComponent} from './components/pages/products/products.component';
import { NewproductComponent } from './components/pages/newproduct/newproduct.component';
import { NonauthproductsComponent } from './components/pages/nonauthproducts/nonauthproducts.component';
import {MyproductsComponent} from './components/pages/myproducts/myproducts.component'
const routes: Routes = [
  {path:'',component:ProductsComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'newproduct',component:NewproductComponent},
  {path:'notauthproducts',component:NonauthproductsComponent},
  {path:'myproducts',component:MyproductsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
