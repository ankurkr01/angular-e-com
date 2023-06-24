import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, product } from '../data-type';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cartData = new EventEmitter<product[] | []>();

  constructor(private http: HttpClient) {}

  addProduct(data: product) {
    return this.http.post('http://localhost:3000/products', data);
  }

  productList() {
    return this.http.get<product[]>('http://localhost:3000/products');
  }
  deleteproduct(id: string) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }
  getproduct(id: string) {
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }
  updateproduct(product: product) {
    return this.http.put<product>(
      `http://localhost:3000/products/${product.id}`,
      product
    );
  }
  popularproduct() {
    return this.http.get<product[]>(`http://localhost:3000/products?_limit=3`);
  }
  trendyproducts() {
    return this.http.get<product[]>(`http://localhost:3000/products?_limit=8`);
  }
  searchproducts(query: string) {
    return this.http.get<product[]>(
      `http://localhost:3000/products?q=${query}`
    );
  }
  localAddToCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }

  removeItemromCart(productId: string) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addToCart(cartData: cart) {
    return this.http.post('http://localhost:3000/cart', cartData);
  }

  getCartList(userId: string) {
    return this.http
      .get<product[]>(`http://localhost:3000/cart?userId=${userId}`, {
        observe: 'response',
      })
      .subscribe((result) => {
       
        
        if (result && result.body) {
          this.cartData.emit(result.body);
      
          
        }
      });
  }


  removeToCart(cartId:any){
    return this.http.delete(`http://localhost:3000/cart/${cartId}`);

  }

  currentCart(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    let userId =  userData.id || userData[0].id;
    
    return this.http.get<cart[]>(`http://localhost:3000/cart?userId=${userId}`)

  }

}
