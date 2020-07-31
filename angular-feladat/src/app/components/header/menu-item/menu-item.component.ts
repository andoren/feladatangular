import { Component, OnInit, Input } from '@angular/core';
import {MenuItem} from "../../../models/MenuItem";
@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {
  @Input() menuItem:MenuItem;
  constructor() { }

  ngOnInit(): void {
    console.log(this.menuItem);
  }
  
  setClasses():void{
    let classes = {
      'nav-item':true,
    }
  }
}
