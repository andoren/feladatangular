import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { Productservice } from 'src/app/service/productservice.service';
import { Shared } from 'src/app/models/Shared';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  
})
export class ProductsComponent implements OnInit {
  @Input() currentPage:string;
  products:Product[];
  _isLoading:boolean;
  constructor(private productService:Productservice, private shared:Shared) { }

  ngOnInit(): void {
   
    this.initProducts();
  }

  initProducts(){
    this. setIsLoading(true) ;
    if(!this.currentPage){   
    
      this.productService.getProducts().subscribe(products=>{
        this.products = products;  
        this. setIsLoading(false);
      });
    }
    else if(this.currentPage === "nonauth"){
      this.productService.getNonAuthProducts().subscribe(products=>{
        this.products = products;
        this. setIsLoading(false);
      });
    } 
    else if(this.currentPage === "private"){
      this.productService.getProductsByUserId().subscribe(products=>{
        this.products = products;
        this. setIsLoading(false);
      });     
    }
   
  }
  setIsLoading(bool:boolean):void{
    this._isLoading = bool;
  }
  getIsLoading():boolean{

    return this._isLoading;
  }
}
