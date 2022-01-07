import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";


@Component({
    selector:'product-list',
    templateUrl:'./product-list.component.html',
    styleUrls:['./product-list.component.css']
})

export class ProductListComponent implements OnInit{
    pageTitle="Product List Template";
    imgWidth=50;
    imgMargin=2;
    showImage:boolean=false;
    filteredproducts:IProduct[]=[];
    products:IProduct[]=[];
    errorMessage = '';
    sub!: Subscription;


    constructor(private productService:ProductService){}
    
    private _listFilter:string='';
    get listFilter():string{
        return this._listFilter;
    }
    set listFilter(value:string){
        this._listFilter=value;
        this.filteredproducts=this.performFilter(value);
    }

    

    toggleImage():void{
        this.showImage=!this.showImage;
    }

    performFilter(filterBy:string):IProduct[]{
        return this.products.filter((product:IProduct)=>
        product.productName.toLocaleLowerCase().includes(filterBy))
    }


    ngOnInit(): void {
        this.sub = this.productService.getProducts().subscribe({
          next: products => {
            this.products = products;
            this.filteredproducts = this.products;
          },
          error: err => this.errorMessage = err
        });
      }

    onRatingClicked(message:string):void{
        this.pageTitle='Product List'+message
    }
    
}