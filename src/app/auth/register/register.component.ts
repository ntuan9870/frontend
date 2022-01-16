import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.component.css']
})
export class RegisterComponent implements OnInit {

  public user = new User();
  public repassword:any='';
  public captcha = false;

  constructor(public c:CommonService, public authService:AuthService, private activeRoute:ActivatedRoute, private el:ElementRef, private router:Router) { }

  ngOnInit(): void {
    this.c = new CommonService
    this.c.input_style.input_name = this.el.nativeElement.querySelector("input[name='username']");
    this.c.input_style.input_email = this.el.nativeElement.querySelector("input[name='email']");
  }

  register(){
    this.c.showLoading()
    this.authService.register(this.user).subscribe(
      res=>{
        this.c.stopLoading()
        this.c.showSwal("Đăng ký thành công!")
        this.router.navigate(['./auth']);
      },error=>{
        this.c.stopLoading()
        this.c.check_error_submit(error);
      }
    );
  }
  
  public handleSuccess(){
    this.captcha = true;
  }
}
