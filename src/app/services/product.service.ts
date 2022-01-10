import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public baseUrl = ""

  constructor(private http:HttpClient, private c:CommonService) {
    this.baseUrl = c.baseUrl+"api/product/"
  }

  public addProduct(form:any){
    return this.http.post(this.baseUrl+"add",form);
  }

  public editProduct(form:any){
    return this.http.post(this.baseUrl+"edit",form);
  }

  public getAllProduct(category_id:any, callback:any){
    this.http.get(this.baseUrl + "getAllProducts?category_id="+category_id).subscribe(
      res=>{
        callback(res['message']);
      },error=>{
        this.c.check_error_submit(error);
      }
    );
  }
  public getProductByID(product_id:any, callback:any){
    this.http.get(this.baseUrl + "getProductByID?product_id="+product_id).subscribe(
      res=>{
        callback(res['message'])
      },error=>{
        this.c.check_error_submit(error);
      }
    );
  }
  public deleteProduct(product_id:any){
    return this.http.delete(this.baseUrl + "delete?product_id=" + product_id);
  }
}
