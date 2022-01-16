import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { TopbarComponent } from './topbar/topbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProductsComponent } from './products/products.component';
import { AddcategoryComponent } from './categories/addcategory/addcategory.component';
import { EditcategoryComponent } from './categories/editcategory/editcategory.component';
import { FormsModule } from '@angular/forms';
import { AddComponent } from './products/add/add.component';
import { EditComponent } from './products/edit/edit.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { EditPromotionComponent } from './promotions/edit-promotion/edit-promotion.component';
import { AddPromotionComponent } from './promotions/add-promotion/add-promotion.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';

@NgModule({
  declarations: [
    AdminComponent,
    TopbarComponent,
    SidebarComponent,
    ProductsComponent,
    AddcategoryComponent,
    EditcategoryComponent,
    AddComponent,
    EditComponent,
    PromotionsComponent,
    EditPromotionComponent,
    AddPromotionComponent,
    UsersComponent,
    AddUserComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    NgxPaginationModule,
    CKEditorModule
  ]
})
export class AdminModule { }
