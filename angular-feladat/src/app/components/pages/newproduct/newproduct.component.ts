import { Component, OnInit } from '@angular/core';
import { Productservice } from 'src/app/service/productservice.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from 'src/app/models/Product';

import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.css']
})
export class NewproductComponent implements OnInit {
  _isLoading:boolean;
  productname:string;
  description:string;
  price:number;
  productForm:FormGroup;
  constructor(private productService:Productservice,   private router:Router, private toastService:ToastService) { }
  ngOnInit(): void {
    this.productForm = new FormGroup({
      'productname':new FormControl(this.productname,[
        Validators.required,
        Validators.minLength(5)
        
      ]),
      'description':new FormControl(this.description,[
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(1000)
        ]
      ),
      'price':new FormControl(this.price,[
        Validators.required,
      
        ]
      ),
      'imagepath':new FormControl(this.selectedFile,[
        Validators.required
        ]
      )
      
    });
  }
  selectedFile: File

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];

  }

  addProduct() {
    this.setIsLoading(true);
    let product:Product= new Product();
    product.imagepath = "https://picsum.photos/300/300.jpg";
    product.name = this.productForm.get("productname").value;
    product.price = this.productForm.get("price").value;
    product.created_date = new Date(Date.now());
    product.owner = JSON.parse(localStorage.getItem('user'));
    product.description = this.productForm.get("description").value;
    console.log(product);
    this.productService.addProduct(product).subscribe(()=>{
      {
        this.toastService.showSuccess("Sikeresen hozzáadott egy új terméket ! :)","Termék hozzáadása");
        this.router.navigate(["/"]);
        this.setIsLoading(false);
      }
    },(error)=>{
      this.toastService.showError(`Hiba történt a termék hozzáadása közben. A hiba oke: ${error.error.error}:(`,"Termék hozzáadása");
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
