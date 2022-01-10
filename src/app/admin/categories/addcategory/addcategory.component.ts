import { Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CommonService } from 'src/app/services/common.service';
import { CategoryService } from 'src/app/services/category.service';
import { NgForm } from '@angular/forms'
declare var $:any;
@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {
  public baseUrl = ""
  constructor(private categoryService:CategoryService, public c:CommonService, private el: ElementRef) {
    this.baseUrl = c.baseUrl
  }
  public category_name ="";
  public category_img = '';
  public resultadd = "";
  public current_categories:Category[] = [];
  public SelectedImage:File = null;
  public first_click_image = false;
  public ct_name = null;
  public config = null;
  @ViewChild('category_namecheck') category_namecheck: ElementRef;
  @ViewChild("addCategory") addCategory: NgForm;

  ngOnInit(): void {
    this.c.input_style.input_name = this.el.nativeElement.querySelector("input[name='category_name']");
    this.show();
    this.ct_name = this.el.nativeElement.querySelector("#category_name");
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.current_categories.length
    }
  }

  add(){
    let fd = new FormData();
    fd.append('category_name',this.category_name);
    fd.append('category_img', this.SelectedImage)
    this.categoryService.add(fd).subscribe(
      res=>{
        this.resultadd='success';
        this.category_name='';
        this.show();
        this.category_name = '';
        this.category_img = null;
        $("#avatar").fadeIn("fast").attr('src','./assets/admin/img/new_seo-10-512.png');
        this.addCategory.reset();
        this.c.showSwal('Thêm thành công!');
      },
      error=>{
        this.c.check_error_submit(error);
      }
    );
  }

  show(){
    this.categoryService.getAllCurrentCategories((result:any)=>{
      this.current_categories = result;
    });
  }

  removeCategory(ca:Category){
    this.c.confirmMessage("Bạn sẽ không thể khôi phục dữ liệu!",()=>{
      this.categoryService.removeCategory(ca.category_id).subscribe(
        res=>{
          this.show();
          this.c.showSwal('Xóa thành công!');
        },error=>{
          alert('Có lỗi trong quá trình truy xuất dữ liêu!');
        }
      );
    })
  }
  onSelect(event){
    this.SelectedImage=this.c.onSelect(event, $("#avatar"), this.SelectedImage)
  }
  pageChanged(event:any){
    this.config.currentPage = event;
  }
}
