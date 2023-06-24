import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cart, product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  productdetail: undefined | product;
  productQuantity: number = 1;
  removeCart: boolean = false;
  cartData:product | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private product: ProductService
  ) {}

  ngOnInit(): void {
    const productId = this.activatedRoute.snapshot.paramMap.get('productId');

    productId &&
      this.product.getproduct(productId).subscribe((result) => {
        this.productdetail = result;

        let cartData = localStorage.getItem('localCart');
        if (productId && cartData) {
          let items = JSON.parse(cartData);
          items = items.filter((item: product) => productId == item.id);
          if (items.length) {
            this.removeCart = true;
          } else {
            this.removeCart = false;
          }
        }

        let user = localStorage.getItem('user');
        if (user) {
          let parseduser = user && JSON.parse(user)
  
        let userId = parseduser.id || parseduser[0].id;
          console.log(userId);
          
          
          this.product.getCartList(userId);
          this.product.cartData.subscribe((result) => {
 
            
            let item = result.filter(
              (item: product) => productId?.toString()  === item.productId?.toString()
              );
 
             
            
            if (item.length) {
            this.cartData = item[0];
         
              this.removeCart = true;
            }
          });
        }
      });
  }

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val == 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val == 'min') {
      this.productQuantity -= 1;
    }
  }

  addToCart() {
    if (this.productdetail) {
      this.productdetail.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.product.localAddToCart(this.productdetail);
        this.removeCart = true;
      } else {
        console.log('user is logged in');
        let user = localStorage.getItem('user');
        
        let parseduser = user && JSON.parse(user)
  
        let userId = parseduser.id || parseduser[0].id;
      
        let cartData: cart = {
          ...this.productdetail,
          userId,
          productId: this.productdetail.id,
        };
        delete cartData.id;
        console.log(cartData);
        this.product.addToCart(cartData).subscribe((result) => {
          this.product.getCartList(userId);
          this.removeCart = true;
        });
      }
    }
  }

  removeToCart(productId: string) {
    if(!localStorage.getItem('user')){

      this.product.removeItemromCart(productId);
      this.removeCart = false;
    }else{
      console.log(this.cartData);
      let user = localStorage.getItem('user');
        
      let parseduser = user && JSON.parse(user)

      let userId = parseduser.id || parseduser[0].id;
 
 
      this.cartData && this.product.removeToCart(this.cartData.id).subscribe((result)=>{
        if(result){
          this.product.getCartList(userId)
        }
      })
 
    }
    
  }
}
