import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import{Product} from 'src/app/models/Product';
import { Shared } from '../models/Shared';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class Productservice{
  options ={}
  constructor(private http:HttpClient, private sharedData:Shared) { 
    this.options = {
      headers:new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':`Bearer:${sharedData.getLoggedInUser().token}`
      })
    }
    console.log(this.options);
  }
  getProducts():Observable<any> {
    return this.http.get<Product[]>(this.sharedData.PUBLIC_BASE_URL+"/getproducts");
  }
  addProduct(product:Product):Observable<any>{
    return this.http.post<Product>(this.sharedData.PROTECTED_BASE_URL+"/addproduct",product,this.options)
  }
}
