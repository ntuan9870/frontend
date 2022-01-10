import { Component, ElementRef, OnInit } from '@angular/core';
import { Promotion } from 'src/app/models/promotion.model';
import { CommonService } from 'src/app/services/common.service';
import { PromotionService } from 'src/app/services/promotion.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {

  public promotions:Promotion[] = [];
  public config = null;
  public tab_items = null;
  public current_tab = 0;
  
  constructor(private promotionService:PromotionService, private c:CommonService,private el: ElementRef) { }

  ngOnInit(): void {
    this.show()
    this.config = {
      itemsPerPage: 6,
      currentPage: 1,
      totalItems: this.promotions.length
    }
    this.tab_items = this.el.nativeElement.querySelectorAll(".tab_item");
  }
  pageChanged(event:any){
    this.config.currentPage = event;
  }
  removePromotion(p:Promotion){
    this.c.confirmMessage("Bạn sẽ không thể khôi phục dữ liệu!",()=>{
      this.c.showLoading();
      this.promotionService.removePromotion(p.promotion_id).subscribe(
        res=>{
          if(res['message']=='success'){
            this.c.showSwal("Xóa thành công!");
            this.c.stopLoading();
            this.show();
          }        
        },error=>{
          this.c.check_error_submit(error)
        }
      );
    })
  }
  show(){
    this.promotionService.get_all_promotions((result:any)=>{
      this.promotions = result;
    });
  }
}
