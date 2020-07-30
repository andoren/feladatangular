export class User{
    id:Number;
    username:String;
    realname:String;
    email:String;
    isAdmin:Boolean;
    constructor(id:Number,username:String,realname:String,email:string,isAdmin:Boolean){
        this.id = id;
        this.username = username;
        this.realname = realname;
        this.email = email;
        this.isAdmin = isAdmin;
    }
}