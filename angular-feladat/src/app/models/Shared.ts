import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class Shared{
   BASE_URL:string = "http://localhost:4200/api";
   PUBLIC_BASE_URL:string = this.BASE_URL+"/public";
   public getBaseURL():string{
       return this.BASE_URL;
   }
}