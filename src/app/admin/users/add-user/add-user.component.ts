import { Location } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  public user:User = new User;
  public repassword = '';

  constructor(public c:CommonService, private el:ElementRef, public authService:AuthService, private location:Location, private userService:UserService, private activeRoute:ActivatedRoute) {
    this.user.user_level = 1
  }

  ngOnInit(): void {
    this.c.input_style.input_name = this.el.nativeElement.querySelector("input[name='user_name']");
    this.c.input_style.input_email = this.el.nativeElement.querySelector("input[name='user_email']");
  }
  addAccount(){
    this.c.showLoading()
    this.authService.register(this.user).subscribe(
      res=>{
        this.c.stopLoading()
        this.c.showSwal("Thêm tài khoản thành công!")
        this.location.back()
      },error=>{
        this.c.stopLoading()
        this.c.check_error_submit(error);
      }
    );
  }

}
