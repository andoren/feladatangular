import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ActivatedRoute } from '@angular/router';
import { Productservice } from 'src/app/service/productservice.service';
import { Shared } from 'src/app/models/Shared';

@Component({
  selector: 'app-sumpage',
  templateUrl: './sumpage.component.html',
  styleUrls: ['./sumpage.component.css']
})
export class SumpageComponent implements OnInit {
  id:number;
  product:Product;
  constructor(private route:ActivatedRoute, private productService:Productservice,private  shared:Shared) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(this.id).subscribe(product=>{{
      this.product = product;      
    }});
    
  }
}
