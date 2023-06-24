import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  allsearchprod :undefined | product[];
  resultavailable:string = 'available';

  constructor( private activatedRoute: ActivatedRoute , private product:ProductService){
  }

  ngOnInit():void{
    const query = this.activatedRoute.snapshot.paramMap.get('query')
 
     query &&  this.product.searchproducts(query).subscribe((result)=>{
        this.allsearchprod = result;
        if(result.length>=1){
            this.resultavailable = 'available'

        }else{
          this.resultavailable = 'notavailable'
        }
      })
  }
}
