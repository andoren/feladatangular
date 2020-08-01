import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { Productservice } from 'src/app/service/productservice.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products:Product[];
  constructor(private productService:Productservice) { }

  ngOnInit(): void {
      this.productService.getProducts().subscribe(products=>{
        this.products = products;
      });
  }

}
