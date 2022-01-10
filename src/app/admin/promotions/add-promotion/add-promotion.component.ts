import { Location } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { DTService } from 'src/app/services/dt.service';
import { PromotionService } from 'src/app/services/promotion.service';

@Component({
  selector: 'app-add-promotion',
  templateUrl: './add-promotion.component.html',
  styleUrls: ['./add-promotion.component.css']
})
export class AddPromotionComponent implements OnInit {

  public old_start_date = ''
  public old_end_date = ''
  public pr_name = null;
  public form = {
    promotion_name:'',
    promotion_start_date:'',
    promotion_end_date:'',
    promotion_infor:'',
    promotion_apply:'true'
  }

  constructor(private dt:DTService, public c:CommonService, private el: ElementRef, private promotionService:PromotionService, private location:Location) { }

  ngOnInit(): void {
    this.form.promotion_start_date = this.dt.getCurrentDateTime();
    this.form.promotion_end_date = this.dt.getNextDateTime();
    this.old_start_date = this.form.promotion_start_date;
    this.old_end_date = this.form.promotion_end_date;
    this.pr_name = this.el.nativeElement.querySelector("input[name='promotion_name']");
  }

  add(){
    this.c.showLoading();
    this.promotionService.add(this.form).subscribe(
      res=>{
        if(res['message']=='success'){
          this.c.showSwal("Thêm CTKM thành công!");
          this.c.stopLoading();
          this.location.back();
        }
      },error=>{
        this.c.check_error_submit(error);
      }
    );
  }

  change_start_date(){
    if(this.form.promotion_start_date > this.form.promotion_end_date){
      this.c.showAlert("Chọn ngày bắt đầu nhỏ hơn ngày kết thúc!");
      this.form.promotion_start_date = this.old_start_date;
      return;
    }
    this.old_start_date = this.form.promotion_start_date;
  }
  change_end_date(){
    if(this.form.promotion_start_date > this.form.promotion_end_date){
      this.c.showAlert("Chọn ngày kết thúc lớn hơn ngày bắt đầu!");
      this.form.promotion_end_date = this.old_end_date;
      return;
    }
    this.old_end_date = this.form.promotion_end_date;
  }
}
