import { Location } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  public user:User = new User;
  private old_user = null;
  public repassword = '';

  constructor(public c:CommonService, private el:ElementRef, public authService:AuthService, private location:Location, private userService:UserService, private activeRoute:ActivatedRoute) {
    this.user.user_level = 1
    this.userService.getUserById(activeRoute.snapshot.params['id'], (result:any)=>{
      this.user = result
      this.old_user = {...this.user}
    });
  }

  ngOnInit(): void {
    this.c.input_style.input_name = this.el.nativeElement.querySelector("input[name='user_name']");
    this.c.input_style.input_email = this.el.nativeElement.querySelector("input[name='user_email']");
  }

  editAccount(){
    if(JSON.stringify(this.user)==JSON.stringify(this.old_user)){
      this.c.showSwal('Không thay đổi gì cả!')
      this.location.back()
      return
    }
    this.userService.editAccount(this.user);
  }

}
