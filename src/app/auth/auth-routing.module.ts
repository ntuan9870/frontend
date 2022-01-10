import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { AdminComponent } from './admin/admin.component';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path:'',component:AuthComponent,
    children:[
      {path:'',component:ClientComponent},
      {path:'admin',component:AdminComponent},
      {path:'register',component:RegisterComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
