import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { Productservice } from 'src/app/service/productservice.service';
import { Shared } from 'src/app/models/Shared';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @Input() currentPage:string;
  products:Product[];
  constructor(private productService:Productservice, private shared:Shared,) { }

  ngOnInit(): void {
    this.initProducts();
  }

  initProducts(){
    if(!this.currentPage){
      this.productService.getProducts().subscribe(products=>{
        this.products = products;
      });
    }
    else if(this.currentPage === "nonauth"){
      this.productService.getNonAuthProducts().subscribe(products=>{
        this.products = products;
      });
    } 
    else if(this.currentPage === "private"){
      this.productService.getProductsByUserId().subscribe(products=>{
        this.products = products;
      });
  }

}
}
