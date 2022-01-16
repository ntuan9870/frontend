import { Location } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../auth.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  public email = ''

  constructor(private authService:AuthService, public c:CommonService, private el:ElementRef, private router:Router, private location:Location) { }

  ngOnInit(): void {
    this.c.input_style.input_email = this.el.nativeElement.querySelector("input[name='email']");
  }

  forgotPassword(){
    this.c.showLoading()
    this.authService.forgotPassword({'user_email':this.email, 'base_url':window.location.href}).subscribe(
      res=>{
        this.router.navigate(['auth']);
        this.c.showNotifiDialog("Kích hoạt đường link trong email để tiếp tục!");
        this.c.stopLoading()
      },error=>{
        this.c.check_error_submit(error);
        this.c.stopLoading()
      }
    );
  }

}
