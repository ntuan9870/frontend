"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[592],{7197:(o,r,t)=>{t.d(r,{v:()=>n});var s=t(3556);let n=(()=>{class a{constructor(){this.baseUrl="http://localhost:8000/",this.validate_error={name_required:!1,name_unique:!1,image_mimes:!1,image_required:!1},this.input_style={input_name:null,input_email:null}}check_error_submit(e){switch(e.status){case 409:showAlert("Ki\u1ec3m tra d\u1eef li\u1ec7u nh\u1eadp v\xe0o!");break;case 404:showAlert("Kh\xf4ng t\xecm th\u1ea5y th\u1ec3 lo\u1ea1i, vui l\xf2ng quay ra!");break;default:showAlert("L\u1ed7i h\u1ec7 th\u1ed1ng!")}e.error.error.forEach(i=>{switch(i){case"name_required":this.validate_error.name_required=!0,this.input_style.input_name&&this.input_style.input_name.classList.add("is-invalid");break;case"name_unique":this.validate_error.name_unique=!0,this.input_style.input_name&&this.input_style.input_name.classList.add("is-invalid");break;case"image_mimes":this.validate_error.image_mimes=!0;break;case"image_required":this.validate_error.image_required=!0;break;case"email_unique":this.validate_error.email_unique=!0,this.input_style.input_email&&this.input_style.input_email.classList.add("is-invalid")}})}showSwal(e){showSwal(e)}showAlert(e){showAlert(e)}confirmMessage(e,i){confirmMessage(e,i)}showLoading(){showLoading()}stopLoading(){stopLoading()}onSelect(e,i,u){try{this.validate_error.image_mimes=!1,this.validate_error.image_required=!1;var _=URL.createObjectURL(e.target.files[0]);return i.fadeIn("fast").attr("src",_),e.target.files[0]}catch(m){return u}}removeNameInputMessage(){this.validate_error.name_required=!1,this.validate_error.name_unique=!1,this.input_style.input_name&&this.input_style.input_name.classList.remove("is-invalid")}removeEmailInputMessage(){this.validate_error.email_required=!1,this.validate_error.email_unique=!1,this.input_style.input_email&&this.input_style.input_email.classList.remove("is-invalid")}hasError(){for(var e=Object.keys(this.validate_error),i=0;i<e.length;i++)if(this.validate_error[e[i]])return!0;return!1}}return a.\u0275fac=function(e){return new(e||a)},a.\u0275prov=s.Yz7({token:a,factory:a.\u0275fac,providedIn:"root"}),a})()}}]);