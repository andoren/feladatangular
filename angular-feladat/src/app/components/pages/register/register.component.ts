import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, EmailValidator, AbstractControl } from '@angular/forms';
import { User } from 'src/app/models/User';
import { ɵangular_packages_platform_browser_platform_browser_d } from '@angular/platform-browser';
import { UserService } from 'src/app/service/userservice.service';
import {mustMatchValidator } from 'src/app/validators/mustmatch.validator';
import * as sha1 from 'js-sha1';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user:User = new User();
  passwordmatch:string;
  userForm:FormGroup;
  constructor(private userService:UserService, private route:Router) { }

  ngOnInit(): void {
    this.user.email="";
    this.user.id=0;
    this.user.username = "";
    this.user.realname="";
    this.user.password="";
    this.user.role="user";
    this.user.token="";
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
        Validators.minLength(5)])
    },{ 
      validators: mustMatchValidator
    });
  }
  get username() { return this.userForm.get('username'); }
  get realname() { return this.userForm.get('realname'); }
  get password() { return this.userForm.get('password'); }
  get email() { return this.userForm.get('email'); }
  get password2() { return this.userForm.get('password2'); }
  invalidPassword():boolean{
    return false;
  }
  passwordsNotMatch():boolean{
    return this.user.password != this.passwordmatch;
  }
  register():void{
    this.user.username = this.username.value;
    this.user.realname = this.realname.value;
    this.user.email = this.email.value;
    this.user.password = sha1(this.password.value);
    console.log(this.user);
    this.userService.register(this.user).subscribe(user=>{
      this.route.navigate(["/"])
    },error=>{
      console.log(error);
    }
    );
 
  }
}
