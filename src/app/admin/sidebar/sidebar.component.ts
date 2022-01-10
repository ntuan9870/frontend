import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public user_level = 0;
  public s_m = false

  constructor() { }

  ngOnInit(): void {
  }
  show_menu(){
    this.s_m = !this.s_m
  }

}
