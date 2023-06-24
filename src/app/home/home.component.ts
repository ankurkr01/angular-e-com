import { Component } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  popularpro: undefined | product[];
  productlist: undefined | product[];

  constructor( private product:ProductService ){}

  ngOnInit():void{
    this.product.popularproduct().subscribe((data)=>{
  
      this.popularpro = data
    })

    this.product.trendyproducts().subscribe((result)=>{
      this.productlist = result;
      
    })

  }
 
}
