import { Component, ElementRef, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ProductService } from 'src/app/services/product.service';
import { CommonService } from 'src/app/services/common.service';
import { ActivatedRoute } from '@angular/router';
import { PromotionService } from 'src/app/services/promotion.service';
import { Promotion } from 'src/app/models/promotion.model';
import { Location } from '@angular/common';
declare var $:any;

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  public product:Product = new Product();
  public Editor = ClassicEditor;
  public promotions:Promotion[] = [];
  public old_image = null;

  constructor(private productService:ProductService, public c:CommonService, private activeRoute:ActivatedRoute, private promotionService:PromotionService, private location:Location, private el:ElementRef) { }

  ngOnInit(): void {
    this.c.input_style.input_name = this.el.nativeElement.querySelector("input[name='name']");
    this.product.category_id = this.activeRoute.snapshot.params['id'];
    this.promotionService.get_all_promotions((result:any)=>{
      this.promotions = result;
    });
  }

  add(){
    let fd = new FormData()
    this.product.product_description = this.product.product_description.replace(/<\/?[^>]+(>|$)/g, "");
    Object.keys(this.product).forEach((key)=>{fd.append(key, this.product[key])});
    this.productService.addProduct(fd).subscribe(
      res=>{
        if(res['message']=='success'){
          this.c.showSwal("Thêm sản phẩm thành công!")
          this.location.back();
        }
      },error=>{
        this.c.check_error_submit(error);
      }
    );
  }

  back(){
    this.location.back()
  }

  onSelect(event:any){
    this.product.product_image = this.c.onSelect(event, $("#avatar"), this.product.product_image)
  }

  onClickSelect(event:any){
    // var target = event.target;
    // console.log(target.value)
    // this.old_image = target
  }
}
