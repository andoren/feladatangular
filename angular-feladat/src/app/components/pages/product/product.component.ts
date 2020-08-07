import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';
import {Productservice} from 'src/app/service/productservice.service'
import { Shared } from 'src/app/models/Shared';
import { ToastService } from 'src/app/service/toast.service';
import { User } from 'src/app/models/User';
import { Address } from 'src/app/models/Address';
import { UserService } from 'src/app/service/userservice.service';
import { Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  id:number;
  product:Product = new Product();
  addresses:Address[];
  _isLoading:boolean;
  selectedAddress:Address;
  addressForm:FormGroup;
  constructor(private userService:UserService,private route:ActivatedRoute, private productService:Productservice,private  shared:Shared, private toastService:ToastService) {
    this.product.owner = new User();
  }

  ngOnInit(): void {
    this.setIsLoading(true);
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(this.id).subscribe(product=>{{
      this.product = product;     
      this.setIsLoading(false); 
    }},error=>{
      if(error.error.erorr)this.toastService.showError(`Hiba történt az adatok betöltése közben. ${error.error.error}`,"Hiba a letöltés közben.");
      else this.toastService.showError(`Hiba történt az adatok betöltése közben. ${error.error}`,"Hiba a letöltés közben.");
      this.setIsLoading(false);

    });
    this.addressForm = new FormGroup({
      'selectedAddress':new FormControl(this.selectedAddress,[
        Validators.required,
        ]
      )
    });
    
  }
  notMine():boolean{
      return this.product.owner.id != this.shared.getLoggedInUser().id;
  }
  buyProduct():void{

    this.product.baddress = this.address.value;
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
  popUpOpen = false;

  chooseAddress() {
    
    this.userService.getAddressesByUserId().subscribe(addresses=>{
      this.popUpOpen = true;
      this.addresses = addresses;
    },error =>{
      if(error.error.error)this.toastService.showError("Hiba az adatok letöltése közben! Hiba: "+error.error.error,"Címek letöltése");
      else this.toastService.showError("Hiba az adatok letöltése közben! Hiba: "+error.error,"Címek letöltése");
    });
    
  }
  get address() { return this.addressForm.get('selectedAddress'); }
  cancelPopUp() {
    this.popUpOpen = false;
  }
}
