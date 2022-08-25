import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IGroup } from '../interfaces/group.interface';
import { CreateTeamResponse } from '../interfaces/responses/admin-responses';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private adminUrl: string = `${environment.apiUrl}/api/admin`;

  constructor(private http: HttpClient) {}

  createTeam(group: IGroup): Observable<CreateTeamResponse> {
    const url = `${this.adminUrl}/create-team`;
    return this.http.post(url, group);
  }
}
