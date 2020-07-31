import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {MenuItem} from "../../../models/MenuItem";
@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {
  @Input() menuItem:MenuItem;
  @Output() logOutEvent:EventEmitter<any> = new EventEmitter();
 
  constructor() { }

  ngOnInit(): void {
  }
  logOut():void{

    this.logOutEvent.emit({'logoutevent':'true'});
  }
  setClasses():void{
    let classes = {
      'nav-item':true,
    }
  }
  logOutItem():boolean{
    return this.menuItem.route == "logout";
  }
  
}
