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
    let user:User = new User;
    user.username = username;
    user.password = password;
    return this.http.post<any>(`${this.sharedData.BASE_URL}/login`,user)
        .pipe(map(user => {
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
        }));
}
    logout(){
      localStorage.removeItem('user');
      this.currentUserSubject.next(null);
    }
    public get getCurrentUserValue(): User {
      return this.currentUserSubject.value;
  }

}
