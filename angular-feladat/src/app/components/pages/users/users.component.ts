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

  ngOnInit(): void {
    this.userSerivce.getUsers().subscribe(users =>{
      this.users = users;
    });
  }

}
