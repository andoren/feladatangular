import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';
import {Productservice} from 'src/app/service/productservice.service'
import { Shared } from 'src/app/models/Shared';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  id:number;
  product:Product;
  constructor(private route:ActivatedRoute, private productService:Productservice,private  shared:Shared) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(this.id).subscribe(product=>{{
      this.product = product;      
    }});
    
  }
  notMine():boolean{
      return this.product.id != this.shared.getLoggedInUser().id;
  }
  buyProduct():void{
    this.productService.buyProduct(this.product);
  }
  isAdmin():boolean{
    return this.shared.getLoggedInUser().role =="admin";
  }
  authProduct():void{
    this.productService.authProduct(this.product);
  }
}
