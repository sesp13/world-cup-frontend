import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { LoginResponse } from '../interfaces/responses/auth-responses';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.manageAuth();
  }
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.manageAuth();
  }

  private manageAuth(): Observable<boolean> {
    if (!this.authService.token) {
      this.redirectToLogin();
      return of(false);
    } else {
      return this.authService.renewSession().pipe(
        map((res: LoginResponse) => {
          if (res.user?.isAdmin) {
            return true;
          } else {
            this.redirectToLogin();
            return false;
          }
        }),
        catchError(() => {
          this.redirectToLogin();
          return of(false);
        })
      );
    }
  }

  private redirectToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}
