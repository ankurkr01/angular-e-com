import { Component } from '@angular/core';
import { cart, priceSummary } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
  cartData: cart[] | any;
  priceSummary:priceSummary = {
    price:0,
    delivery:0,
    discount:0,
    tax:0,
    total:0
  }

  constructor(private product:ProductService){}

  ngOnInit():void{
    this.product.currentCart().subscribe((result)=>{
  
      if(result){

        this.cartData = result;
        let price = 0;
        result.forEach((item:any)=>{
          price = price+ (+(item.price)*(item.quantity))
        })

        this.priceSummary.price = price;
        this.priceSummary.delivery=100;
        this.priceSummary.discount = price/8;
        this.priceSummary.tax = price/9;
        this.priceSummary.total = (price+price/10)-price/10+100;
      
        
      }
      
    })
  }


  removeToCart(id:any){

  }

  checkout(){

  }

}
