import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/userservice.service';
import { ActivatedRoute } from '@angular/router';
import * as sha1 from 'js-sha1';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-modifyuser',
  templateUrl: './modifyuser.component.html',
  styleUrls: ['./modifyuser.component.css']
})
export class ModifyuserComponent implements OnInit {
  id:number;
  user:User = new User();
  passwordtemp:string = "";
  roles:any[];
  selectedRole:any = {};
  _isLoading:boolean;
  userForm:FormGroup = new FormGroup({});
  constructor(private userService:UserService, private route:ActivatedRoute, private toastService:ToastService) {
      this.roles = [{'role':"admin",'name':'Adminisztrátor'},{'role':"user",'name':'Felhasználó'}];
      this.userForm = new FormGroup({
        'realname':new FormControl(this.user.realname,[
          Validators.required,
          Validators.minLength(5)
          ]
        ),
        'password':new FormControl(this.passwordtemp,[
          Validators.required,
          Validators.minLength(8)
          ]
        ),
        'role':new FormControl(this.user.role,[
          Validators.required
        ])
        ,
        'email':new FormControl(this.user.email,[
          Validators.required,
          Validators.minLength(5)]
        ),
        'username':new FormControl(this.user.username,
          [Validators.required,
          Validators.minLength(5)])
      });
   }

  ngOnInit(): void {
    this.setIsLoading(true);
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUserById(this.id).subscribe(user=>{
        this.user = user;  
        this.selectedRole = this.roles.filter(r => r.role == user.role)[0];
        this.setIsLoading(false);
    },(error)=>{
      this.setIsLoading(false);
      this.toastService.showError(`Hiba az oldal letöltése közben. Az oka: ${error.error.error}`,"Hiba a letöltés közben.");

    });
  
}

get username() { return this.userForm.get('username'); }
get realname() { return this.userForm.get('realname'); }
get password() { return this.userForm.get('password'); }
get email() { return this.userForm.get('email'); }
get role() { return this.userForm.get('role'); }
invalidPassword():boolean{
  return false;
}

modifyUser():void{
  this.setIsLoading(true);
  if(this.passwordtemp.length> 0) this.user.password = sha1(this.password.value);
  this.user.email = this.email.value;
  this.user.realname = this.realname.value;
  this.user.role = this.role.value.role;
  this.user.username = this.username.value;
  this.userService.modifyUser(this.user).subscribe(()=>{
    this.setIsLoading(false);
    this.toastService.showSuccess("Sikeresen módosította a felhasználót","Felhasználó módosítása");
    
  },(error)=>{
    this.setIsLoading(false);
    this.toastService.showError(`Hiba a felhasználó módosítása közben. Az oka: ${error.error.error}`,"Felhasználó módosítása");
  });
}
setIsLoading(bool:boolean):void{
  this._isLoading = bool;
}
getIsLoading():boolean{
  return this._isLoading;
}
}
