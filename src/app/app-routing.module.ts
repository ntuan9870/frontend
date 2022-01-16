import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './services/guards/admin.guard';

const routes: Routes = [
  {path:'',loadChildren:()=>import('./client/client.module').then(m=>m.ClientModule)},
  {path:'admin',canActivate:[AdminGuard],loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)},
  {path:'auth',loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
