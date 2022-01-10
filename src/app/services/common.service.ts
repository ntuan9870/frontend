import { Injectable } from '@angular/core';
declare function showSwal(message:any):any;
declare function showAlert(message:any):any;
declare function confirmMessage(message, callback):any;
declare function showLoading():any;
declare function stopLoading():any;

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public baseUrl = "http://localhost:8000/";
  // public baseUrl = "http://mobileshoptt.tk/public/"; 
  public validate_error = {'name_required':false, 'name_unique':false, 'image_mimes':false, 'image_required':false}; 
  public input_style = {'input_name': null, 'input_email': null}
  constructor() { }
  public check_error_submit(error:any){
    switch(error.status){
      case 409:
        showAlert("Kiểm tra dữ liệu nhập vào!");
        break;
      case 404:
        showAlert("Không tìm thấy thể loại, vui lòng quay ra!");
        break;
      default:
        showAlert("Lỗi hệ thống!");
    }
    error.error.error.forEach(err => {
      switch(err){
        case 'name_required':
          this.validate_error['name_required'] = true;
          if (this.input_style.input_name) this.input_style.input_name.classList.add("is-invalid");
          break;
        case 'name_unique':
          this.validate_error['name_unique'] = true;
          if (this.input_style.input_name) this.input_style.input_name.classList.add("is-invalid");
          break
        case 'image_mimes':
          this.validate_error['image_mimes'] = true;
          break;
        case 'image_required':
          this.validate_error['image_required'] = true;
          break;
        case 'email_unique':
          this.validate_error['email_unique'] = true;
          if (this.input_style.input_email) this.input_style.input_email.classList.add("is-invalid");
          break
      }
    });
  }
  public showSwal(message:any){
    showSwal(message)
  }
  public showAlert(message:any){
    showAlert(message)
  }
  public confirmMessage(message, callback){
    confirmMessage(message,callback);
  }
  public showLoading(){
    showLoading();
  }
  public stopLoading(){
    stopLoading();
  }
  public onSelect(event, view, product_image){
    try{
      this.validate_error['image_mimes'] = false;
      this.validate_error['image_required'] = false;
      var tmpPath = URL.createObjectURL(event.target.files[0]);
      view.fadeIn("fast").attr('src',tmpPath);
      return <File>event.target.files[0];
    }catch(e){
      return product_image;
    }
  }
  public removeNameInputMessage(){
    this.validate_error['name_required'] = false;
    this.validate_error['name_unique'] = false;
    if (this.input_style.input_name) this.input_style.input_name.classList.remove("is-invalid");
  }
  public removeEmailInputMessage(){
    this.validate_error['email_required'] = false;
    this.validate_error['email_unique'] = false;
    if (this.input_style.input_email) this.input_style.input_email.classList.remove("is-invalid");
  }
  public hasError(){
    var validateErrors = Object.keys(this.validate_error);
    for(var i = 0; i < validateErrors.length; i++){
      if(this.validate_error[validateErrors[i]]){
        return true;
      }
    }
    return false;
  }
}
