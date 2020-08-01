import {User} from '../models/User'
export class Product{
  id:number;
  name:string;
  description:string;
  imagepath:string;
  owner:User;
  isAccapted:boolean;
  price:number;
  issold:boolean;
  created_date:Date;
  sold_date:Date;
}