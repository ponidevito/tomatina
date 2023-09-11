import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ROLE } from '../constants/role.constant';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private accountService: AccountService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const currentUser = JSON.parse(
      localStorage.getItem('currentUser') as string
    );
    if (currentUser) {
      if (currentUser.role === ROLE.ADMIN) {
        if (state.url.startsWith('/admin/category')) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      } else if (
        currentUser.role === ROLE.USER &&
        (state.url.startsWith('/my-cabinet/user') ||
          state.url.startsWith('/my-cabinet/order-history') ||
          state.url.startsWith('/my-cabinet/change-password'))
      ) {
        return true;
      }
    }
    this.router.navigate(['']);
    return false;
  }
}


