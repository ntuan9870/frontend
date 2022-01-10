import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  public baseUrl = "";
  public captcha = false;

  constructor(private http : HttpClient, private c:CommonService) {
    this.baseUrl = c.baseUrl+"api/auth/";
  }

  public register(user:any) {
    return this.http.post(this.baseUrl+'register',user);
  }
  public handleSuccess(){
    this.captcha = true;
  }

}
