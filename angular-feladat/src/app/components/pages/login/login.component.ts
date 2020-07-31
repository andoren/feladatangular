import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/userservice.service';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
import * as sha1 from 'js-sha1';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  username:string;
  password:string;
  currentUser:User;
  invalidLogin:boolean;
  constructor(private userService:UserService, private router:Router) { }
  
  ngOnInit(): void {
    let currentUser:User = this.userService.getCurrentUserValue;
    if(currentUser && currentUser.token.length > 0){
      this.router.navigate(["/"]);
    }
  }

  logIn():void{
    this.userService.login(this.username,sha1(this.password)).subscribe(user=>{
      this.invalidLogin = false
      this.currentUser = user;
    },error=>{
      console.log(error);
    }
    ,()=>{
      if(this.currentUser && this.currentUser.token !== null) this.router.navigate(["/"]);
      else {this.invalidLogin = true};
   
    });
 
}

}
