import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { CommonService } from 'src/app/services/common.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public category_id = '';
  public products:Product[] = [];
  public config = null;
  public baseUrl = ''
  public rootProducts:Product[]=[];

  constructor(private c:CommonService, private ar:ActivatedRoute, private productService:ProductService, private el: ElementRef) {
    this.baseUrl = c.baseUrl
  }

  ngOnInit(): void {
    this.category_id = this.ar.snapshot.params['id'];
    this.show();
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.products.length
    }
  }
  getAllProductsByCategoryId(category_id:any){
    this.productService.getAllProduct(category_id, (result:any)=>{
      this.products = result
      this.rootProducts = [...this.products]
    })
  }
  show(){
    this.getAllProductsByCategoryId(this.category_id);
  }
  search(event:any){
    this.products = [];
    let keyword = event.target.value;
    this.rootProducts.forEach(product => {
      if(product.product_name.includes(keyword)) this.products.push(product)
    });
  }
  deleteProduct(p:Product){
    this.c.confirmMessage("Bạn sẽ không thể khôi phục dữ liệu!",()=>{
      this.productService.deleteProduct(p.product_id).subscribe(
        res=>{
          if (res['message']=='success'){
            this.c.showSwal('Xóa thành công!');
            this.show()
          }
        },error=>{
          this.c.check_error_submit(error);
        }
      );
    })
  }
  getHistoryPrice(product_id:Product){

  }
  pageChanged(event:any){
    this.config.currentPage = event;
  }
  readMore(event){
    var h = event.target;
    if(h.classList.contains("collapse_p")){
      h.classList.remove('collapse_p');
      h.classList.remove('r_blur');
      h.innerText = "<< Rút gọn"
    }else{
      h.classList.add('collapse_p');
      h.classList.add('r_blur');
      h.innerText = "Xem thêm >>"
    }
  }
}
