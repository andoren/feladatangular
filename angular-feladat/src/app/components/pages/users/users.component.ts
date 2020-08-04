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
    },()=>{
      this.toastService.showError("Hiba az adatok letöltése közben. Sajnáljuk! :(","Hiba a letöltés közben.");
    });
  }
  deleteUser(user:User){
    this.setIsLoading(true);
    this.userSerivce.deleteUser(user).subscribe(()=>{
      this.users = this.users.filter(u=>u.id!==user.id);
      this.toastService.showSuccess(`Sikeresen kitörölted a ${user.username} nevű felhasználót.`,"Felhasználó törlése");
    },(error)=>{
      console.log(error);
      this.toastService.showError(`Hiba a törlés közben! Sajnáljuk :(`,"Felhasználó törlése");
    },()=>{
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
