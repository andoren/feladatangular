import {HttpClient,HttpHeaders} from '@angular/common/http'
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  isLoggedIn:boolean;
  
  constructor() { }
}
