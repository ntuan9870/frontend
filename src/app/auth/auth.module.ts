import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { ClientComponent } from './client/client.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { NgxCaptchaModule } from 'ngx-captcha';


@NgModule({
  declarations: [
    AuthComponent,
    ClientComponent,
    AdminComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    NgxCaptchaModule
  ]
})
export class AuthModule { }
