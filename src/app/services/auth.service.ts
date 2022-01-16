import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  public baseUrl = "";
  public siteKey = "6LdMywEeAAAAAKwC2KvVcwxpuQelmiRhQ-M4rru_";
  public times = 0;

  constructor(private http : HttpClient, private c:CommonService, private router:Router) {
    this.baseUrl = c.baseUrl+"api/auth/";
  }

  public register(user:any) {
    return this.http.post(this.baseUrl+'register',user);
  }
  public login(user:any){
    return this.http.post(this.baseUrl+"login", user);
  }
  public forgotPassword(data:any){
    return this.http.get(this.baseUrl+"forgotPassword?user_email="+data['user_email']+'&base_url='+data['base_url']);
  }
  public checkRePassword(repassword:any, user_password:any){
    if (repassword === user_password || repassword==''){
      return false;
    }
    return true;
  }
  public resetPassword(user:any){
    this.c.showLoading()
    return this.http.put(this.baseUrl+"resetPassword",user).subscribe(
      res=>{
        this.c.stopLoading()
        this.c.showSwal("Đổi mật khẩu thành công!")
        this.router.navigate(['./auth']);
      }, error=>{
        this.c.stopLoading()
        this.c.check_error_submit(error)
      }
    );
  }
  public loginSuccessed(user:any, remember_account:any, type:any){
    this.c.showLoading()
    this.login(user).subscribe(
      res=>{
        user = res['message']
        this.c.stopLoading()
        if (user.user_level == 3&&type=='client'||user.user_level < 3&&type=='admin'){
          if (remember_account==1){
            localStorage.setItem('user', JSON.stringify(user));
          }else{
            sessionStorage.setItem('user', JSON.stringify(user));
          }
          if(user.user_level == 3) this.router.navigate(['./']); else {
            this.router.navigate(['../admin']);
          }
        }else this.loginFail();
      },error=>{
        this.loginFail()
        this.c.stopLoading()
        console.log(error)
      }
    );
  }
  loginFail(){
    console.log("ABC")
    if(this.times>=3) this.router.navigate(['./auth/forgot_password']);
    this.times++
    this.c.showAlert("Tài khoản bạn vừa nhập không chính xác - Lưu ý: nếu bạn nhập sai quá 3 lần sẽ chuyển sang trang quên mật khẩu)!");
  }
}
