import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ROLE } from '../constants/role.constant';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Firestore } from '@angular/fire/firestore';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [{ provide: Firestore, useValue: {} }],
    });
    authGuard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });
  it('should allow an ADMIN user to access the /admin/actions route', () => {
    const currentUser = { role: ROLE.ADMIN };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(currentUser));
    const mockActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const mockRouterStateSnapshot = {
      url: '/admin/actions',
    } as RouterStateSnapshot;
    const result = authGuard.canActivate(
      mockActivatedRouteSnapshot,
      mockRouterStateSnapshot
    );
    expect(result).toBeTrue();
  });
  it('should prevent a USER from accessing the /admin/actions route', () => {
    const currentUser = { role: ROLE.USER };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(currentUser));
    const mockActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const mockRouterStateSnapshot = {
      url: '/admin/actions',
    } as RouterStateSnapshot;
    const result = authGuard.canActivate(
      mockActivatedRouteSnapshot,
      mockRouterStateSnapshot
    );
    expect(result).toBeFalse();
  });
  it('should prevent an unauthenticated user from accessing a protected route', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    const mockActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const mockRouterStateSnapshot = {
      url: '/admin/actions',
    } as RouterStateSnapshot;

    const routerSpy = spyOn(router, 'navigate');

    const result = authGuard.canActivate(
      mockActivatedRouteSnapshot,
      mockRouterStateSnapshot
    );

    expect(result).toBeFalse();
    expect(routerSpy).toHaveBeenCalledWith(['']);
  });
});
