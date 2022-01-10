import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Promotion } from '../models/promotion.model';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  public baseUrl = ""
  constructor(private http:HttpClient, private c:CommonService) {
    this.baseUrl = c.baseUrl+"api/promotion/"
  }
  public add(form:any) {
    return this.http.post(this.baseUrl+'add',form);
  }
  public get_all_promotions(callback:any){
    return this.http.get(this.baseUrl+'get_all_promotions').subscribe(
      res=>{
        callback(res['message']);
      },error=>{
        this.c.check_error_submit(error);
      }
    );
  }
  public getPromotionById(promotion_id:any, callback:any){
    return this.http.get(this.baseUrl+'get_promotion_by_id?promotion_id='+promotion_id).subscribe(
      res=>{
        callback(res['message']);
      },error=>{
        this.c.check_error_submit(error);
      }
    );
  }
  public edit(promotion){
    return this.http.put(this.baseUrl+"update", promotion);
  }
  public removePromotion(promotion_id:any){
    return this.http.delete(this.baseUrl+'remove?promotion_id='+promotion_id);
  }
}
