import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import{Product} from 'src/app/models/Product';
import { Shared } from '../models/Shared';
import { JsonPipe } from '@angular/common';
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})

export class Productservice{

  constructor(private http:HttpClient, private sharedData:Shared) { 

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
  getHeaderOption():any{
    return this.options = {
      headers:new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':`Bearer:${this.sharedData.getLoggedInUser().token}`
      })
    }
  }
}
