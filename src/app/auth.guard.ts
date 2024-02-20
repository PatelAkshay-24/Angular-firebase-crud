import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterEvent, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppStrings } from './shared/helper/app-strings';
import { AuthService } from './shared/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
 
  constructor(private authService: AuthService , private router:Router){}
  
  canActivate(): boolean {
    return this.checkAuth();
  }

  


private checkAuth(): boolean {
    if (this.authService.isAuthenticatedUser()) {
      return true;
    } else {
      // Redirect to the login page if the user is not authenticated
      this.router.navigate([AppStrings.LOGIN_ROUTE]);
      return false;
    }
  }
}
