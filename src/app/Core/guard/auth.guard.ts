import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: ApiServiceService
) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let authentication: any = localStorage.getItem('isLoggedIn');

      if (!authentication) {
        let url: string = state.url;
        this.authenticationService.redirectUrl = url;
        this.router.navigate(['/login']);
        localStorage.clear();
        return false;
      } else {
        return true;
      }
  }
  
}
