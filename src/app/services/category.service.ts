import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../models/category.model';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public baseUrl = ""
  public input_style = {
    "input_name" : null
  }

  constructor(private http:HttpClient, private c:CommonService) {
    this.baseUrl = c.baseUrl+"api/category/";
  }

  public add(form:any) {
    return this.http.post(this.baseUrl+'add',form);
  }

  public getAllCurrentCategories(callback){
    this.http.get(this.baseUrl+'getAllCurrentCategories').subscribe(
      res=>{
        callback(res['categories'])
      },error=>{
        this.c.showAlert("Lỗi hệ thống!")
      }
    );
  }
  public get_category_by_id(category_id:any, callback){
    return this.http.get(this.baseUrl+"get_category_by_id?category_id="+category_id).subscribe(
      res=>{
        callback(res['message']);
      },error=>{
        this.c.check_error_submit(error);
      }
    );;
  }

  public update(fd:any){
    return this.http.post(this.baseUrl+"update",fd);
  }

  public checkname(categoryname:any){
    return this.http.get(this.baseUrl+"checkname?category_name="+categoryname);
  }

  public removeCategory(category_id:any){
    return this.http.delete(this.baseUrl+'remove',{params:{category_id:category_id}});
  }
  public check_name(event:any){
    this.checkname(event.target.value).subscribe(
      res=>{
        return res['message'];
      },
      error=>{
        return 'error';
      }
    );
    return '';
  }
}
