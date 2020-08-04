import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ActivatedRoute } from '@angular/router';
import { Productservice } from 'src/app/service/productservice.service';
import { Shared } from 'src/app/models/Shared';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-sumpage',
  templateUrl: './sumpage.component.html',
  styleUrls: ['./sumpage.component.css']
})
export class SumpageComponent implements OnInit {
  id:number;
  product:Product;
  _isLoading:boolean;
  constructor(private route:ActivatedRoute, private productService:Productservice,private  toastService:ToastService) { }

  ngOnInit(): void {
    this.setIsLoading(true);
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(this.id).subscribe(product=>{{
      this.product = product;
            
    }},(error)=>{
      this.toastService.showError("Hiba az oldal letöltése közben. Sajnáljuk ! :(","Hiba a letöltés közben.");
    },()=>{
      this.setIsLoading(false);
    });
    
  }
  setIsLoading(bool:boolean):void{
    this._isLoading = bool;
  }
  getIsLoading():boolean{

    return this._isLoading;
  }
}
