import { Injectable } from '@angular/core';
import { User } from './User';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
  })
export class Shared{
   /**
    *
    */
   constructor(private cookieService:CookieService) {
      
   }
   BASE_URL:string = "http://localhost:4200/api";
   PUBLIC_BASE_URL:string = this.BASE_URL+"/public";
   PROTECTED_BASE_URL:string = this.BASE_URL+"/protected";
   public getBaseURL():string{
       return this.BASE_URL;
   }
   public getLoggedInUser():User{
     try{
      let user:User = JSON.parse(this.cookieService.get("user"));
      return user;
      }catch(error){
         console.log(error);
         return null;
      }
   }
}