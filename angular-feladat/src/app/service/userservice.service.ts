import {HttpClient,HttpHeaders} from '@angular/common/http'
import { Injectable } from '@angular/core';
import{User} from '../models/User';
import { Observable,BehaviorSubject } from 'rxjs';
import {Shared} from '../models/Shared';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import {ToastService} from 'src/app/service/toast.service'
import { Address } from '../models/Address';
const httpOptions={
  headers:new HttpHeaders({
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin': '*'
  })
}
@Injectable({
  providedIn: 'root'
})

export class UserService {
  sharedData:Shared;
  options = {};
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

   constructor(private http:HttpClient, private router:Router, private toastService:ToastService) {
      this.sharedData = new Shared();
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
      this.currentUser = this.currentUserSubject.asObservable();
   }
   getUsers():Observable<any>{
     return this.http.get<User[]>(`${this.sharedData.PROTECTED_BASE_URL}/getusers`,this.getHeaderOption());
   }
   modifyUser(user:User):Observable<any>{
     return this.http.post(`${this.sharedData.PROTECTED_BASE_URL}/modifyuser`,user,this.getHeaderOption());
   }
   deleteUser(user:User):Observable<any>{
     return this.http.delete(`${this.sharedData.PROTECTED_BASE_URL}/deleteuser/${user.id}`,this.getHeaderOption())
   }
   getUserById(id:number):Observable<any>{
     return this.http.get(`${this.sharedData.PROTECTED_BASE_URL}/getuserbyid/${id}`,this.getHeaderOption());
   }
   getAddressesByUserId():Observable<any>{
     return this.http.get(`${this.sharedData.PROTECTED_BASE_URL}/getuseraddresses`,this.getHeaderOption());
   }
   login(username, password):Observable<any> {
    return this.http.post<User>(`${this.sharedData.BASE_URL}/login`,{"username":username,"password":password})
        .pipe(map(user => {
            if(user.token && user.token !== undefined && user.token !== null)localStorage.setItem('user', JSON.stringify(user));
          
            this.currentUserSubject.next(user);
            return user;
        }));
    }
    register(user:User,addresses:Address[]):Observable<any>{
      console.log({user,addresses});
      return this.http.post<User>(`${this.sharedData.BASE_URL}/register`,{user,addresses}).pipe(
        map(user =>{
          if(user.token !== null)localStorage.setItem('user', JSON.stringify(user));
         
            this.currentUserSubject.next(user);
          return user;
        })
      )
    }
    logout(){
      localStorage.removeItem('user');
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
      this.router.navigate(["login"]);
      this.toastService.showInfo("Sikeres kijelentkezés!","Kijelentkezés");
    }
    public get getCurrentUserValue(): User {
      return this.currentUserSubject.value;
  }
  getHeaderOption():any{
    return this.options = {
      headers:new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':`Bearer:${this.sharedData.getLoggedInUser().token}`
      })
    }
  }
}
