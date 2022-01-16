import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = ''

  constructor(private http:HttpClient, private c:CommonService, private location:Location) {
    this.baseUrl = c.baseUrl+"api/user/"
  }

  public getAllUsers(callback:any){
    this.http.get(this.baseUrl+'getAllUsers').subscribe(
      res=>{
        callback(res['message'])
      },error=>{
        this.c.check_error_submit(error)
      }
    );
  }
  public getUserById(user_id:any, callback:any){
    this.http.get(this.baseUrl+'getUserById?user_id='+user_id).subscribe(
      res=>{
        callback(res['message'])
      },error=>{
        this.c.check_error_submit(error)
      }
    );
  }
  public editAccount(user:any){
    this.http.put(this.baseUrl+'editAccount', user).subscribe(
      res=>{
        this.c.showSwal('Sửa tài khoản thành công!')
        this.location.back()
      },error=>{
        this.c.check_error_submit(error)
      }
    );
  }
  public removeUser(user_id:any){
    return this.http.delete(this.baseUrl+'deleteAccount?user_id=' + user_id);
  }
}
