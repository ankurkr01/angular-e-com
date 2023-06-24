import { Component } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent {
  productList: undefined | product[];

  constructor(private product: ProductService) {}
  productMessage: string = '';
  icon = faTrash;
  iconEdit = faEdit;

  ngOnInit(): void {
    this.list();
  }

  deleteProduct(id: string) {
    this.product.deleteproduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product is deleted';
        this.list();
      }
    });
    setTimeout(() => {
      this.productMessage = ' ';
    }, 3000);
  }

  list() {
    this.product.productList().subscribe((result) => {
      this.productList = result;
    });
  }
}
