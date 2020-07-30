import { Component, OnInit, Input } from '@angular/core';
import{UserService} from '../../service/userservice.service';
import{User} from '../../models/User';
import * as sha1 from 'js-sha1';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() title:string;
  currentUser:User
  constructor(private userService:UserService) {

   }

  ngOnInit(): void {
  }
  logIn():void{
       this.userService.login("anita",sha1("Feladat2020&")).subscribe(user=>{
         this.currentUser = user;
       });

  }
  logOut():void{

    this.userService.logout();
  }
  public isLoggedIn():boolean{
    return this.currentUser != null;
  }
}
