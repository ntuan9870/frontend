import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users:User[] = [];
  public config = null;
  public logged_admin:User = null

  constructor(private userService:UserService, private c:CommonService, private router:Router) { }

  ngOnInit(): void {
    this.logged_admin = this.c.getLoggedUser()
    this.getUsers()
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.users.length
    }
  }

  getUsers(){
    this.c.showLoading()
    this.userService.getAllUsers((result:any)=>{
      this.users = result
      this.c.stopLoading()
    });
  }

  removeUser(user_id:any){
    this.c.confirmMessage("Bạn sẽ không thể khôi phục dữ liệu!", ()=>{
      this.userService.removeUser(user_id).subscribe(
        res=>{
          this.c.showSwal('Xóa tài khoản thành công!')
          this.getUsers()
          if(user_id == this.logged_admin.user_id){
            this.c.logout()
            this.router.navigate(['../auth/admin']);
          }
        },error=>{
          this.c.check_error_submit(error)
        }
      )
    })
  }
  pageChanged(event:any){
    this.config.currentPage = event;
  }

}
