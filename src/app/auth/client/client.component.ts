import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { stringify } from 'querystring';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['../auth.component.css']
})
export class ClientComponent implements OnInit {

  public user = new User()
  public captcha = false;
  public remember_account = 0;

  constructor(public authService:AuthService, private c:CommonService, private router:Router) { }

  ngOnInit(): void {
  }

}
