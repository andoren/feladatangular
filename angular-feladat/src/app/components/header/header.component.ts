import { Component, OnInit, Input } from '@angular/core';
import{UserService} from '../../service/userservice.service';
import{User} from '../../models/User';

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
       this.userService.login("misi","Feladat2020#").subscribe(user=>{
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
