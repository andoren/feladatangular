import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/service/userservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})

export class UserItemComponent implements OnInit {
  @Input() user:User;
  @Output() deleteUser:EventEmitter<User>=new EventEmitter();
  constructor(private router:Router ,private userService:UserService) { }

  ngOnInit(): void {
  }



  onDeleteUser(user):void{
      this.deleteUser.emit(user);
      console.log("Emited");
  }
}
