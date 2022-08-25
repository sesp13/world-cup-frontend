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
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private authService: AuthService) {}

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
        map((response: LoginResponse) => {
          if (response.token) {
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

  redirectToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}
