import { Component, OnInit } from '@angular/core';
import { Productservice } from 'src/app/service/productservice.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from 'src/app/models/Product';

import { ToastService } from 'src/app/service/toast.service';
import { Shared } from 'src/app/models/Shared';

@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.css']
})
export class NewproductComponent implements OnInit {
  _isLoading:boolean;
  productnameholder:string;
  descriptionholder:string;
  priceholder:number;
  productForm:FormGroup;
  constructor(private productService:Productservice, private sharedData:Shared,  private router:Router, private toastService:ToastService) { }
  ngOnInit(): void {
    this.productForm = new FormGroup({
      'productname':new FormControl(this.productnameholder,[
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50)
        
      ]),
      'description':new FormControl(this.descriptionholder,[
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(1000)
        ]
      ),
      'price':new FormControl(this.priceholder,[
        Validators.required,
        Validators.min(0)
        ]
      )
      
    });
  }
  selectedFile: File

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];

  }
  get productname(){return this.productForm.get("productname");}
  get description(){return this.productForm.get("description");}
  get price(){return this.productForm.get("price");}
  addProduct() {
    if(this.productForm.invalid) {
      this.toastService.showError("Hibás termék űrlap kitöltés","Hibás kitöltés");
      return;
    }
    this.setIsLoading(true);
    let product:Product= new Product();
    product.imagepath = "https://picsum.photos/300/300.jpg";
    product.name = this.productname.value;
    product.price = this.price.value;
    product.created_date = new Date(Date.now());
    product.owner = this.sharedData.getLoggedInUser();
    product.description = this.description.value;
    this.productService.addProduct(product).subscribe(()=>{
      {
        this.toastService.showSuccess("Sikeresen hozzáadott egy új terméket ! :)","Termék hozzáadása");
        this.router.navigate(["/"]);
        this.setIsLoading(false);
      }
    },(error)=>{
      if(error.error.error)this.toastService.showError(`Hiba történt a termék hozzáadása közben. A hiba oka: ${error.error.error}:(`,"Termék hozzáadása");
      else this.toastService.showError(`Hiba történt a termék hozzáadása közben. A hiba oka: ${error.error}`,"Termék hozzáadása");
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
