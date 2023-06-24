import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css'],
})
export class SellerUpdateProductComponent {
  productData: undefined | product;
  productMessage:string='';
  constructor(private route: ActivatedRoute, private product: ProductService, private routes:Router) {}

  ngOnInit() {
    let productId = this.route.snapshot.paramMap.get('id');

    productId &&
      this.product.getproduct(productId).subscribe((data) => {
        this.productData = data;
      });
  }

  update(product: product) {
    console.log(product);
    if(this.productData){
      product.id = this.productData.id;
    }
    
    
    this.product.updateproduct(product).subscribe((result)=>{
      if(result){
        this.productMessage = 'Product update successfully'

      }
      setTimeout(() => {
        this.productMessage = '';
        this.routes.navigate(['/seller-home'])
      }, 2000);
      
    })
  }
}
