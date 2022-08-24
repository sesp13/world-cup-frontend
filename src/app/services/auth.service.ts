import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../interfaces/responses/auth-responses';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl: string = `${environment.apiUrl}/api/auth`;

  constructor(private http: HttpClient) {}

  login(user: IUser): Observable<LoginResponse> {
    const url = `${this.authUrl}/login`;
    return this.http.post(url, user);
  }
}
