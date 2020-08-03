import { Component, OnInit, Input } from '@angular/core';
import{UserService} from '../../service/userservice.service';
import{User} from '../../models/User';
import { Router } from '@angular/router';
import { MenuItem } from 'src/app/models/MenuItem';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() title:string;
  currentUser:User
  menuItems:MenuItem[] 
  constructor(private userService:UserService, private router:Router) {
      router.events.subscribe(()=>{
        this.currentUser = this.userService.getCurrentUserValue;
        this.createMenuItems();
      });
   }

  ngOnInit(): void {
      this.currentUser = this.userService.getCurrentUserValue;
      this.createMenuItems();
  }

  logOut():void{
    this.userService.logout();
  }
  public isLoggedIn():boolean{
    return this.currentUser !== null && this.currentUser.username.length > 0;
  }
  private createMenuItems(){
      if(this.currentUser && this.currentUser != undefined){
          this.menuItems = this.createDefaultMenu();
          this.menuItems.push({'text':'Termékeim','route':'myproducts'});
          this.menuItems.push({'text':'Új termék','route':'newproduct'});

        if(this.currentUser.role == "admin"){
          this.menuItems.push(
            {
              'text':"Felhasználók",
              'route':"getusers"
            });
          this.menuItems.push(
              {
                'text':"Termék engedélyezés",
                'route':"notauthproducts"
              });
        }
        this.menuItems.push({'text':'Kijelentkezés('+this.currentUser.username+')','route':'logout'});
      }
      else{
        this.menuItems = this.createPublicMenu();
      }
  }
   private createDefaultMenu():MenuItem[]{
      let tempItems = [
        {'text':'Főoldal','route':'/'},
        {'text':'Kapcsolat','route':'contact'},
        {'text':'Segítség','route':'/'}
      ];
      return tempItems;
  }
  private createPublicMenu():MenuItem[]{
    let tempItems = this.createDefaultMenu();
    tempItems.push( {'text':'Bejelentkezés','route':'login'} );
    return tempItems;
  }
}
