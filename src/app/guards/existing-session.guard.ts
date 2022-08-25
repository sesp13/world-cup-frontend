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
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ExistingSessionGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.manageSession();
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.manageSession();
  }

  private manageSession(): Observable<boolean> {
    if (this.authService.token) {
      this.redirectToDashboard();
      return of(false);
    } else {
      return of(true);
    }
  }

  private redirectToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
