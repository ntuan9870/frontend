import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AddcategoryComponent } from './categories/addcategory/addcategory.component';
import { EditcategoryComponent } from './categories/editcategory/editcategory.component';
import { AddComponent } from './products/add/add.component';
import { EditComponent } from './products/edit/edit.component';
import { ProductsComponent } from './products/products.component';
import { AddPromotionComponent } from './promotions/add-promotion/add-promotion.component';
import { EditPromotionComponent } from './promotions/edit-promotion/edit-promotion.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path:'',component:AdminComponent,
    children:[
      {path:'categories',
        children:[
          {path:'add',component:AddcategoryComponent},
          {path:'edit/:id',component:EditcategoryComponent}
        ]
      },
      {path:'products/:id',
        children:[
          {path:'',component:ProductsComponent},
          {path:'add',component:AddComponent},
          {path:'edit/:product_id',component:EditComponent}
        ]
      },
      {path:'promotions',
        children:[
          {path:'',component:PromotionsComponent},
          {path:'add',component:AddPromotionComponent},
          {path:'edit/:id',component:EditPromotionComponent}
        ]
      },{path:'users',
        children:[
          {path:'',component:UsersComponent},
          {path:'add',component:AddUserComponent},
          {path:'edit/:id',component:EditUserComponent}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
