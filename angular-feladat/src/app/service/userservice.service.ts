import {HttpClient,HttpHeaders} from '@angular/common/http'
import { Injectable } from '@angular/core';
import{User} from '../models/User';
import { Observable,BehaviorSubject } from 'rxjs';
import {Shared} from '../models/Shared';
import { map } from 'rxjs/operators';
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
  options:HttpHeaders ;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

   constructor(private http:HttpClient) {
      this.sharedData = new Shared();
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
      this.currentUser = this.currentUserSubject.asObservable();
   }

   login(username, password):Observable<any> {
    return this.http.post<User>(`${this.sharedData.BASE_URL}/login`,{"username":username,"password":password})
        .pipe(map(user => {
            if(user.token !== null)localStorage.setItem('user', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
        }));
}
    logout(){
      localStorage.removeItem('user');
      this.currentUserSubject.next(new User());
      
    }
    public get getCurrentUserValue(): User {
      return this.currentUserSubject.value;
  }

}
