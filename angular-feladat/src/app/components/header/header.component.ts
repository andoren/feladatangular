import { Component, OnInit, Input } from '@angular/core';
import{UserService} from '../../service/userservice.service';
import{User} from '../../models/User';

import { stringify } from '@angular/compiler/src/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() title:string;
  currentUser:User
  constructor(private userService:UserService, private router:Router) {
      router.events.subscribe(()=>{
        this.currentUser = this.userService.getCurrentUserValue;
      });
   }

  ngOnInit(): void {
      this.currentUser = this.userService.getCurrentUserValue;
      console.log(this.currentUser);
  }

  logOut():void{
    this.userService.logout();
  }
  public isLoggedIn():boolean{
    return this.currentUser !== null && this.currentUser.username.length > 0;
  }
}
