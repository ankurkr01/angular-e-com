import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private route: Router, private product: ProductService) {}
  menuType: string = 'default';
  sellerName: string = '';
  searchResult: undefined | product[];
  userName: string = '';
  cartItems = 0;

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          this.menuType = 'seller';
          if (localStorage.getItem('seller')) {
            let sellerInfo = localStorage.getItem('seller');
            let sellerData = sellerInfo && JSON.parse(sellerInfo);
            this.sellerName = sellerData.name;
          }
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name || userData[0].name;
          this.menuType = 'user';
      
          
          this.product.getCartList(userData.id || userData[0].id)
        } else {
          this.menuType = 'default';
        }
      }
    });

    let cartData = localStorage.getItem('localCart');

    if (cartData) {
      let cartprod = JSON.parse(cartData);
 
      
      this.cartItems = cartprod.length;
    }

   
    this.product.cartData.subscribe((items) => {
      this.cartItems = items.length;
    
      
    });
  }
  

  search(query: KeyboardEvent) {
    if (query) {
      let element = query.target as HTMLInputElement;
      this.product.searchproducts(element.value).subscribe((result) => {
        this.searchResult = result;
      });
    }
  }

  hidesearch() {
    this.searchResult = undefined;
  }
  redirecttodetail(id: string) {
    this.route.navigate([`detail/${id}`]);
  }

  submitSearch(val: string) {
    this.route.navigate([`search/${val}`]);
  }

  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);

  }

  userlogout() {
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
    this.product.cartData.emit([])
  }
}
