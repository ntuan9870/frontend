import { Component, ElementRef, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Promotion } from 'src/app/models/promotion.model';
import { CommonService } from 'src/app/services/common.service';
import { ProductService } from 'src/app/services/product.service';
import { PromotionService } from 'src/app/services/promotion.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  public product:Product = new Product();
  public old_product:Product = null;
  public Editor = ClassicEditor;
  public promotions:Promotion[] = [];

  constructor(private productService:ProductService, public c:CommonService, private promotionService:PromotionService, private activeRoute:ActivatedRoute,private location:Location, private el:ElementRef) { }

  ngOnInit(): void {
    this.c.input_style.input_name = this.el.nativeElement.querySelector("input[name='name']");
    this.productService.getProductByID(this.activeRoute.snapshot.params['product_id'],(result:Product)=>{
      this.product = result;
      $("#avatar").fadeIn("fast").attr('src',this.c.baseUrl+this.product.product_image);
      this.product.product_image = null;
      if(!this.product.product_accessories) this.product.product_accessories = ''
      if(!this.product.product_warranty) this.product.product_warranty = ''
      this.old_product = {...this.product}
    });
    this.promotionService.get_all_promotions((result:any)=>{
      this.promotions = result;
    });
  }
  edit(){
    if(JSON.stringify(this.product)==JSON.stringify(this.old_product)){
      this.c.showSwal("Không thay đổi!")
      this.location.back();
      return;
    }
    let fd = new FormData()
    this.product.product_description = this.product.product_description.replace(/<\/?[^>]+(>|$)/g, "");
    Object.keys(this.product).forEach((key)=>{fd.append(key, this.product[key])});
    this.productService.editProduct(fd).subscribe(
      res=>{
        if(res['message']=='success'){
          this.c.showSwal("Sửa sản phẩm thành công!")
          this.location.back();
        }
      },error=>{
        this.c.check_error_submit(error)
      }
    );
  }
  back(){
    this.location.back()
  }
  onSelect(event:any){
    this.product.product_image = this.c.onSelect(event, $("#avatar"),this.product.product_image)
  }
}
