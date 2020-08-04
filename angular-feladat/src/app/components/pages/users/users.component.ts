import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/service/userservice.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users:User[];
  constructor(private userSerivce:UserService) { }
  _isLoading:boolean;
  ngOnInit(): void {
    this.setIsLoading(true);
    this.userSerivce.getUsers().subscribe(users =>{
      this.users = users;
      this.setIsLoading(false);
    });
  }
  deleteUser(user:User){

    this.userSerivce.deleteUser(user).subscribe(()=>{
      this.users = this.users.filter(u=>u.id!==user.id);
    });
  }
  setIsLoading(bool:boolean):void{
    this._isLoading = bool;
  }
  getIsLoading():boolean{
    return this._isLoading;
  }
}
