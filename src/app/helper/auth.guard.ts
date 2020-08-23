import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild, CanLoad, CanDeactivate, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'app/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad, CanDeactivate<unknown> {

  constructor(
    private router: Router,
    private authService: LoginService
  ) { }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    // throw new Error('Method not implemented.');
    return null;

  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // throw new Error('Method not implemented.');
    return null;
  }
  canLoad(
    route: Route,
    segments: import('@angular/router').UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    // throw new Error('Method not implemented.');
    return null;

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const currentUser = this.authService.currentUserValue;
    // const userRole = 
    if (currentUser) {
      // logged in so return true
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

}
