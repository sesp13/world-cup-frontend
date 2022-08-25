import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetAllGroupsResponse } from '../interfaces/responses/group-responses';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private groupsUrl = `${environment.apiUrl}/api/groups`;

  constructor(private http: HttpClient) {}

  getAllGroups(): Observable<GetAllGroupsResponse> {
    return this.http.get(this.groupsUrl);
  }
}
