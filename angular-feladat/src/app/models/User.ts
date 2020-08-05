import {Address} from 'src/app/models/Address'
export class User{
    id:number;
    username:string;
    realname:string;
    email:string;
    role:string;
    token:string;
    password:string;
    addresses:Address[];
    getToken():string{
        return this.token;
    }
    setToken(token:string):void{
        this.token = token;
    }
    isAdmin():boolean{
        return this.role=="admin";
    }
}