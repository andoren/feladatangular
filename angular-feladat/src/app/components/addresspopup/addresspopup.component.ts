import { Component, OnInit, Input } from '@angular/core';

import { openCloseAnimation, openCloseShadeAnimation } from './animations';
@Component({
  selector: 'app-addresspopup',
  templateUrl: './addresspopup.component.html',
  styleUrls: ['./addresspopup.component.css'],
  animations: [
    openCloseAnimation,
    openCloseShadeAnimation,
  ]
})
export class AddresspopupComponent implements OnInit {
  @Input() isOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

}
