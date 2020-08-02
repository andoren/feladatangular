import {HttpClient,HttpHeaders} from '@angular/common/http'
import { Injectable } from '@angular/core';
import{User} from '../models/User';
import { Observable,BehaviorSubject } from 'rxjs';
import {Shared} from '../models/Shared';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
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

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

   constructor(private http:HttpClient, private router:Router) {
      this.sharedData = new Shared();
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
      this.currentUser = this.currentUserSubject.asObservable();
   }

   login(username, password):Observable<any> {
    return this.http.post<User>(`${this.sharedData.BASE_URL}/login`,{"username":username,"password":password})
        .pipe(map(user => {
            if(user.token && user.token !== undefined && user.token !== null)localStorage.setItem('user', JSON.stringify(user));

            this.currentUserSubject.next(user);
            return user;
        }));
    }
    register(user:User):Observable<any>{
      return this.http.post<User>(`${this.sharedData.BASE_URL}/register`,user).pipe(
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
      
    }
    public get getCurrentUserValue(): User {
      return this.currentUserSubject.value;
  }

}
