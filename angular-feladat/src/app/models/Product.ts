import {User} from '../models/User'
import { Address } from './Address';
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
  buyer:User;
  baddress:Address;
}