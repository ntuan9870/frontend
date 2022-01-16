import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { of, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CommonService } from '../common.service';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordGuard implements CanActivate {
  private result_check_token = false;
  constructor(private http:HttpClient, private c:CommonService, private router:Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>
  {
    return this.checkToken(route);
  }
  checkToken(route): Observable<boolean>{
    return this.http.get(this.c.baseUrl+'api/auth/checkResetPasswordToken?token='+route.paramMap.get('token')).pipe(
      map(
        (response) => {
          sessionStorage.setItem('user_id', response['message']);
          return true;
        }),
        catchError(error => {
          this.router.navigate(['']);
          return of(false);
        })
      );
  }
  
}
