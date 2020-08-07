import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import{Product} from 'src/app/models/Product';
import { Shared } from '../models/Shared';
import { JsonPipe } from '@angular/common';
import { stringify } from '@angular/compiler/src/util';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})

export class Productservice{

  constructor(private http:HttpClient, private sharedData:Shared, private router:Router, private toastService:ToastService) { 

  }
  options={};
  getProducts():Observable<any> {
    return this.http.get<Product[]>(`${this.sharedData.PUBLIC_BASE_URL}/getproducts`);
  }
  addProduct(product:Product):Observable<any>{
    return this.http.post<Product>(`${this.sharedData.PROTECTED_BASE_URL}/addproduct`,product,this.getHeaderOption())
  }
  getNonAuthProducts():Observable<any>{
    return this.http.get<Product[]>(`${this.sharedData.PROTECTED_BASE_URL}/notauthproducts`,this.getHeaderOption());
  }
  getProductsByUserId():Observable<any> {
    return this.http.get<Product[]>(`${this.sharedData.PROTECTED_BASE_URL}/getproductsbyuserid/${this.sharedData.getLoggedInUser().id}`,this.getHeaderOption());
  }
  getProductById(id:number):Observable<any>{
    return this.http.get<Product>(`${this.sharedData.PUBLIC_BASE_URL}/getproductbyid/${id}`);
  }
  buyProduct(product:Product):void{
    this.http.post(`${this.sharedData.PROTECTED_BASE_URL}/buyproduct`,product,this.getHeaderOption()).subscribe(()=>{
      this.toastService.showSuccess(`Sikeresen megvásárolta a terméket ${product.price} Ft-ért ! Hamarosan felveszi önnel a kapcsolatott a termék tulajdonosa.(${product.owner.realname})`,"Vásárlás");
      this.router.navigate(["/"]);
    },error=>{
      if(error.error.error)this.toastService.showError(`Hiba történt a vásárlás közben. A hiba oka: ${error.error.error} `,"Vásárlás");
      else this.toastService.showError(`Hiba történt a vásárlás közben. A hiba oka: ${error.error} `,"Vásárlás");
    });
  }
  authProduct(product:Product):void{
    this.http.post(`${this.sharedData.PROTECTED_BASE_URL}/authproduct`,product,this.getHeaderOption()).subscribe(()=>{this.toastService.showSuccess(`Sikeresen engedélyezte a "${product.name}" terméket.`,"Termék engedélyezése");
      this.router.navigate(["notauthproducts"]);
    },error=>{
      if(error.error.error)this.toastService.showError(`Hiba történt az engedélyezés közben. A hiba oka: ${error.error.error} `,"Termék engedélyezése");
      else this.toastService.showError(`Hiba történt az engedélyezés közben. A hiba oka: ${error.error} `,"Termék engedélyezése");
    });
  }
  getHeaderOption():any{
    console.log(this.sharedData.getLoggedInUser());
    return this.options = {
      headers:new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':`Bearer:${this.sharedData.getLoggedInUser().token}`
      })
    }
  }
}
