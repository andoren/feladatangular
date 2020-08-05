import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/service/userservice.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users:User[];
  constructor(private userSerivce:UserService, private toastService:ToastService) { }
  _isLoading:boolean;
  ngOnInit(): void {
    this.setIsLoading(true);
    this.userSerivce.getUsers().subscribe(users =>{
      this.users = users;
      this.setIsLoading(false);
    },(error)=>{
      this.toastService.showError(`Hiba az adatok letöltése közben.  Az oka: ${error.error.error}`,"Hiba a letöltés közben.");
      this.setIsLoading(false);
    });
  }
  deleteUser(user:User){
    this.setIsLoading(true);
    this.userSerivce.deleteUser(user).subscribe(()=>{
      this.users = this.users.filter(u=>u.id!==user.id);
      this.toastService.showSuccess(`Sikeresen kitörölted a ${user.username} nevű felhasználót.`,"Felhasználó törlése");
      this.setIsLoading(false);
    },(error)=>{
      this.toastService.showError(`Hiba a felhasználó törlése közben.  Az oka: ${error.error.error}`,"Felhasználó törlése");
      this.setIsLoading(false);
    });
  }
  setIsLoading(bool:boolean):void{
    this._isLoading = bool;
  }
  getIsLoading():boolean{
    return this._isLoading;
  }
}
