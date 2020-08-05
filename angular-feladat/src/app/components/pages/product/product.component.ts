import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';
import {Productservice} from 'src/app/service/productservice.service'
import { Shared } from 'src/app/models/Shared';
import { ToastService } from 'src/app/service/toast.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  id:number;
  product:Product = new Product();
 
  _isLoading:boolean;
  constructor(private route:ActivatedRoute, private productService:Productservice,private  shared:Shared, private toastService:ToastService) {
    this.product.owner = new User();
  }

  ngOnInit(): void {
    this.setIsLoading(true);
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(this.id).subscribe(product=>{{
      this.product = product;     
      this.setIsLoading(false); 
    }},error=>{
      this.toastService.showError(`Hiba történt az adatok betöltése közben. ${error.error.error}`,"Hiba a letöltés közben.");
      this.setIsLoading(false);

    });
    
  }
  notMine():boolean{
      return this.product.owner.id != this.shared.getLoggedInUser().id;
  }
  buyProduct():void{
    this.productService.buyProduct(this.product);
  }
  isAdmin():boolean{
    return this.shared.getLoggedInUser() && this.shared.getLoggedInUser().role =="admin" && !this.product.isAccapted;
  }
  authProduct():void{
    this.setIsLoading(true);
    this.productService.authProduct(this.product);
    this.setIsLoading(false);
  }
  setIsLoading(bool:boolean):void{
    this._isLoading = bool;
  }
  getIsLoading():boolean{

    return this._isLoading;
  }
}
