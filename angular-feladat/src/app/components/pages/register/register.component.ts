import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, EmailValidator, AbstractControl } from '@angular/forms';
import { User } from 'src/app/models/User';
import { ɵangular_packages_platform_browser_platform_browser_d } from '@angular/platform-browser';
import { UserService } from 'src/app/service/userservice.service';
import {mustMatchValidator } from 'src/app/validators/mustmatch.validator';
import * as sha1 from 'js-sha1';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/service/toast.service';
import { Address } from 'src/app/models/Address';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user:User = new User();
  passwordmatch:string;
  userForm:FormGroup;
  _isLoading:boolean;
  address1:Address;
  address2:Address;
  additionalAddressForm:FormGroup;
  addresses:Address[] = [];
    constructor(private userService:UserService, private route:Router, private toastService:ToastService) { }

  ngOnInit(): void {
    this.address1 = new Address();
    this.address2 = new Address();
    this.address1.country="Magyarország";
    this.address2.country="Magyarország";
    this.user.role="user";
    this.userForm = new FormGroup({
      'realname':new FormControl(this.user.realname,[
        Validators.required,
        Validators.minLength(5)
        
      ]),
      'password':new FormControl(this.user.password,[
        Validators.required,
        Validators.minLength(8),
        ]
      ),
      'password2':new FormControl(this.passwordmatch,[
        Validators.required,
        Validators.minLength(8),
        ]
      ),
      'email':new FormControl(this.user.email,[
        Validators.required,
        Validators.minLength(5)]
      ),
      'username':new FormControl(this.user.username,
        [Validators.required,
        Validators.minLength(5)]),
        'address1street':new FormControl(this.address1.street,[
          Validators.required
        ])
        ,
        'address1number':new FormControl(this.address1.number,[
          Validators.required
        ])
        ,
        'address1zip':new FormControl(this.address1.zip,[
          Validators.required
        ])
        ,
        'address1county':new FormControl(this.address1.county,[
          Validators.required
        ])
        ,
        'address1country':new FormControl(this.address1.country,[
          Validators.required
        ])
        ,
        'address1village':new FormControl(this.address1.village,[
          Validators.required
        ])
    },{ 
      validators: mustMatchValidator
    });
    this.additionalAddressForm = new FormGroup({
      
        'address2street':new FormControl(this.address2.street,[
          Validators.required
        ])
        ,
        'address2number':new FormControl(this.address2.number,[
          Validators.required
        ])
        ,
        'address2zip':new FormControl(this.address2.zip,[
          Validators.required
        ])
        ,
        'address2county':new FormControl(this.address2.county,[
          Validators.required
        ])
        ,
        'address2country':new FormControl(this.address2.country,[
          Validators.required
        ])
        ,
        'address2village':new FormControl(this.address2.village,[
          Validators.required
        ])
    });
  }
  get username() { return this.userForm.get('username'); }
  get realname() { return this.userForm.get('realname'); }
  get password() { return this.userForm.get('password'); }
  get email() { return this.userForm.get('email'); }
  get password2() { return this.userForm.get('password2'); }

  get address1street() { return this.userForm.get('address1street'); }
  get address1zip() { return this.userForm.get('address1zip'); }
  get address1number() { return this.userForm.get('address1number'); }
  get address1county() { return this.userForm.get('address1county'); }
  get address1village() { return this.userForm.get('address1village'); }

  get address2street() { return this.additionalAddressForm.get('address2street'); }
  get address2zip() { return this.additionalAddressForm.get('address2zip'); }
  get address2number() { return this.additionalAddressForm.get('address2number'); }
  get address2county() { return this.additionalAddressForm.get('address2county'); }
  get address2village() { return this.additionalAddressForm.get('address2village'); }
  
  invalidPassword():boolean{
    return false;
  }
  passwordsNotMatch():boolean{
    return this.user.password != this.passwordmatch;
  }
  register():void{
    if(this.userForm.invalid) {
      this.toastService.showError("Hibás regisztrációs űrlap kitöltés","Hibás kitöltés");
      return;
    }
    else{
      this.address1.county = this.address1county.value;
      this.address1.village = this.address1village.value;
      this.address1.zip = this.address1zip.value;
      this.address1.street = this.address1street.value;
      this.address1.number = this.address1number.value;
      this.addresses.push(this.address1);
    }
    if(!this.additionalAddressForm.invalid)
    {
      this.address2.county = this.address2county.value;
      this.address2.village = this.address2village.value;
      this.address2.zip = this.address2zip.value;
      this.address2.street = this.address2street.value;
      this.address2.number = this.address2number.value;
      this.addresses.push(this.address2);
    }
   
    this. setIsLoading(true);
    this.user.username = this.username.value;
    this.user.realname = this.realname.value;
    this.user.email = this.email.value;
    this.user.password = sha1(this.password.value);
    
    this.userService.register(this.user,this.addresses).subscribe(user=>{
      this.route.navigate(["/"])
      this.setIsLoading(false);
      this.toastService.showSuccess("Sikeres regisztráció","Regisztráció");
    },error=>{
      if(error.error.error)this.toastService.showError(`Sikertelen regisztráció. Az oka: ${error.error.error}`,"Regisztráció");
      else this.toastService.showError(`Sikertelen regisztráció. Az oka: ${error.error}`,"Regisztráció");
      console.log(error);
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
