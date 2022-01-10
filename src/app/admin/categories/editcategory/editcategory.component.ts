import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CommonService } from 'src/app/services/common.service';
import { CategoryService } from 'src/app/services/category.service';
declare function showSwal(message:any):any;
import { NgForm } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
declare var $:any;

@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.css']
})
export class EditcategoryComponent implements OnInit {

  public baseUrl = ""
  public category:Category = new Category();
  public SelectedImage:File = null;
  public id = "";
  public category_old = new Category();
  @ViewChild("editCategory") editCategory: NgForm;
  constructor(private categoryService:CategoryService, public c:CommonService, private activatedRoute:ActivatedRoute,private location:Location,private el: ElementRef) {
    this.baseUrl = c.baseUrl
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.c.input_style.input_name = this.el.nativeElement.querySelector("input[name='category_name']");
    this.categoryService.get_category_by_id(this.id, (result:any)=>{
      this.category = result;
      this.category_old = {...this.category};
      $("#avatar").fadeIn("fast").attr('src',this.baseUrl+this.category.category_image);
    });
  }

  edit(){
    let fd = new FormData()
    fd.append("category_id", this.category.category_id);
    fd.append("category_name", this.category.category_name);
    fd.append("category_image", this.category.category_image);
    fd.append("image",this.SelectedImage);
    if(this.category.category_name == this.category_old.category_name&&(this.SelectedImage==null||this.category.category_image.replace(/^.*[\\\/]/,'')==this.SelectedImage.name)){
      showSwal('Không thay đổi!');
      this.location.back();
      return;
    }
    this.categoryService.update(fd).subscribe(
      res=>{
        showSwal('Thay đổi thành công!');
        this.location.back();
      },
      error=>{
        this.c.check_error_submit(error);
      }
    );
  }
  onSelect(event){
    this.SelectedImage=this.c.onSelect(event, $("#avatar"), this.SelectedImage)
  }
}
