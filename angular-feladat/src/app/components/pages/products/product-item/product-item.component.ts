import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { Router } from '@angular/router';
import { registerLocaleData} from '@angular/common';
import localeHu from '@angular/common/locales/hu';
import { Shared } from 'src/app/models/Shared';
registerLocaleData(localeHu, 'hu');
@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input()product:Product
  constructor(private route:Router, private shared:Shared) {
   
   }
  ngOnInit(): void {
    this.product.created_date = new Date(Date.now());
  }
  readMore():void{
      this.route.navigate(['product/'+this.product.id]);
  }
  productIsMine():boolean{
    return this.shared.getLoggedInUser() && this.product.owner.id == this.shared.getLoggedInUser().id;
  }
}
