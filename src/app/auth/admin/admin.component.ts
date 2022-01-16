import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['../auth.component.css']
})
export class AdminComponent implements OnInit {

  public user:User = new User()
  public captcha = false;
  public remember_account = 0;

  constructor(public authService:AuthService, private c:CommonService, private router:Router) { }

  ngOnInit(): void {
  }

  // login(){
  //   this.c.showLoading()
  //   this.authService.login(this.user).subscribe(
  //     res=>{
  //       this.user = res['message']
  //       if (this.remember_account==1){
  //         localStorage.setItem('user', JSON.stringify(this.user));
  //       }else{
  //         sessionStorage.setItem('user', JSON.stringify(this.user));
  //       }
  //       this.c.stopLoading()
  //       if (this.user.user_level < 3) this.router.navigate(['./admin']); else this.loginFail();
  //     },error=>{
  //       this.loginFail()
  //       this.c.stopLoading()
  //     }
  //   );
  // }

  loginFail(){
    this.c.showAlert("Tài khoản bạn vừa nhập không chính xác - Lưu ý: nếu bạn nhập sai quá 3 lần sẽ chuyển sang trang quên mật khẩu)!");
  }

}
