import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AddcategoryComponent } from './categories/addcategory/addcategory.component';

const routes: Routes = [
  {path:'',component:AdminComponent,
    children:[
      { path:'categories',
        children:[
          {path:'add',component:AddcategoryComponent}
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
