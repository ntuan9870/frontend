import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { AdminComponent } from './admin/admin.component';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './forgot-password/reset-password/reset-password.component';
import { ResetPasswordGuard } from '../services/guards/reset-password.guard';

const routes: Routes = [
  {
    path:'',component:AuthComponent,
    children:[
      {path:'',component:ClientComponent},
      {path:'admin',component:AdminComponent},
      {path:'register',component:RegisterComponent},
      {path:'forgot_password',component:ForgotPasswordComponent},
      {path:'forgot_password/:token',canActivate:[ResetPasswordGuard],component:ResetPasswordComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
