import { Injectable } from '@angular/core';
import { User } from './User';

@Injectable({
    providedIn: 'root'
  })
export class Shared{
   BASE_URL:string = "http://localhost:4200/api";
   PUBLIC_BASE_URL:string = this.BASE_URL+"/public";
   PROTECTED_BASE_URL:string = this.BASE_URL+"/protected";
   public getBaseURL():string{
       return this.BASE_URL;
   }
   public getLoggedInUser():User{
      return JSON.parse(localStorage.getItem("user"));
   }
}