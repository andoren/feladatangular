export class User{
    id:number;
    username:string;
    realname:string;
    email:string;
    isAdmin:boolean;
    token:string;
    password:string;
    constructor(){

    }
    
    getToken():string{
        return this.token;
    }
    setToken(token:string):void{
        this.token = token;
    }
}