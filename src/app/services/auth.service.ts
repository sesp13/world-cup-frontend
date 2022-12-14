import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../interfaces/responses/auth-responses';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl: string = `${environment.apiUrl}/api/auth`;

  get token(): string | null {
    return localStorage.getItem('token');
  }

  get user(): IUser | null {
    const userString = localStorage.getItem('user');
    if (userString) {
      return JSON.parse(userString);
    } else {
      return null;
    }
  }

  constructor(private http: HttpClient, private router: Router) {}

  login(user: IUser): Observable<LoginResponse> {
    const url = `${this.authUrl}/login`;
    return this.http
      .post(url, user)
      .pipe(tap((res: LoginResponse) => this.setLocalData(res)));
  }

  renewSession(): Observable<LoginResponse> {
    const url = `${this.authUrl}/renew`;
    return this.http.get(url).pipe(
      tap((res: LoginResponse) => this.setLocalData(res)),
      catchError((error) => {
        this.clearLocalData();
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    this.clearLocalData();
    this.router.navigate(['/auth/login']);
  }

  private setLocalData(response: LoginResponse): void {
    if (response.token) localStorage.setItem('token', response.token);
    if (response.user)
      localStorage.setItem('user', JSON.stringify(response.user));
  }

  private clearLocalData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
