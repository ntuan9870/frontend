import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['../../auth.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public user:User = new User;
  public repassword:any='';
  public captcha = false;

  constructor(public authService:AuthService, private activeRoute:ActivatedRoute, private c:CommonService) {
    this.c = new CommonService
    this.user.user_id = sessionStorage.getItem('user_id');
    sessionStorage.removeItem('user_id');
  }

  ngOnInit(): void {
  }

  resetPassword(){
    this.authService.resetPassword(this.user);
  }

}
