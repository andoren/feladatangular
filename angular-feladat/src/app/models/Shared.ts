import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class Shared{
   BASE_URL:string = "http://localhost:4200/api";
   public getBaseURL():string{
       return this.BASE_URL;
   }
}