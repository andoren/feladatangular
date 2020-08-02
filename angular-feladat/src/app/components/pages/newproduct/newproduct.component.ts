import { Component, OnInit } from '@angular/core';
import { Productservice } from 'src/app/service/productservice.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from 'src/app/models/Product';
import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';

@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.css']
})
export class NewproductComponent implements OnInit {

  productname:string;
  description:string;
  price:number;
  productForm:FormGroup;
  constructor(private productService:Productservice, private router:Router) { }
  ngOnInit(): void {
    this.productForm = new FormGroup({
      'productname':new FormControl(this.productname,[
        Validators.required,
        Validators.minLength(5)
        
      ]),
      'description':new FormControl(this.description,[
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(255)
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
    let product:Product= new Product();
    product.imagepath = "http://via.placeholder.com/300";
    product.name = this.productForm.get("productname").value;
    product.price = this.productForm.get("price").value;
    product.created_date = new Date(Date.now());
    product.owner = JSON.parse(localStorage.getItem('user'));
    product.description = this.productForm.get("description").value;
    console.log(product);
    this.productService.addProduct(product).subscribe(()=>{
      {
        this.router.navigate(["/"]);
      }
    },(error)=>{
      console.log(error);
    });
  }
}
