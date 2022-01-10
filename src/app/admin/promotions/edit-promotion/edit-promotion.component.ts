import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Promotion } from 'src/app/models/promotion.model';
import { CommonService } from 'src/app/services/common.service';
import { DTService } from 'src/app/services/dt.service';
import { PromotionService } from 'src/app/services/promotion.service';

@Component({
  selector: 'app-edit-promotion',
  templateUrl: './edit-promotion.component.html',
  styleUrls: ['./edit-promotion.component.css']
})
export class EditPromotionComponent implements OnInit {

  public old_start_date = ''
  public old_end_date = ''
  public pr_name = null;
  public promotion = {
    promotion_id : '',
    promotion_name:'',
    promotion_start_date:'',
    promotion_end_date:'',
    promotion_infor:'',
    promotion_apply : "true"
  }
  public old_promotion = null

  constructor(private c:CommonService, private promotionService:PromotionService, private activeRoute:ActivatedRoute, private location:Location) { }

  ngOnInit(): void {
    this.promotion.promotion_id = this.activeRoute.snapshot.params['id'];
    this.promotionService.getPromotionById(this.promotion.promotion_id, (result:any)=>{
      this.promotion = result
      this.old_promotion = {...this.promotion}
    })
  }

  change_start_date(){
    if(this.promotion.promotion_start_date > this.promotion.promotion_end_date){
      this.c.showAlert("Chọn ngày bắt đầu nhỏ hơn ngày kết thúc!");
      this.promotion.promotion_start_date = this.old_start_date;
      return;
    }
    this.old_start_date = this.promotion.promotion_start_date;
  }
  change_end_date(){
    if(this.promotion.promotion_start_date > this.promotion.promotion_end_date){
      this.c.showAlert("Chọn ngày kết thúc lớn hơn ngày bắt đầu!");
      this.promotion.promotion_end_date = this.old_end_date;
      return;
    }
    this.old_end_date = this.promotion.promotion_end_date;
  }
  edit(){
    if(JSON.stringify(this.promotion) === JSON.stringify(this.old_promotion)){
      this.c.showSwal("Không thay đổi gì cả!");
      this.location.back();
      return;
    }
    this.c.showLoading();
    this.promotionService.edit(this.promotion).subscribe(
      res=>{
        if(res['message']=='success'){
          this.c.showSwal("Sửa CTKM thành công!");
          this.c.stopLoading();
          this.location.back();
        }
      },error=>{
        this.c.check_error_submit(error);
      }
    );
  }

}
