import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import{Product} from 'src/app/models/Product';
import { Shared } from '../models/Shared';
@Injectable({
  providedIn: 'root'
})
export class Productservice{

  constructor(private http:HttpClient, private sharedData:Shared) { }
  getProducts():Observable<any> {
    return this.http.get<Product[]>(this.sharedData.PUBLIC_BASE_URL+"/getproducts");
  }
}
