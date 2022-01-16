import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { CommonService } from 'src/app/services/common.service';
// import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  public show_dropdown = false
  public logged_admin:User = null

  constructor(public c:CommonService) { }

  ngOnInit(): void {
    this.logged_admin = this.c.getLoggedUser()
  }
  open_drop_info(){
    this.show_dropdown=!this.show_dropdown
  }

}
