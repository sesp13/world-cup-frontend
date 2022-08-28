import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PagingParams } from '../interfaces/paging-params';
import { getStikcersByUserStatusResponse } from '../interfaces/responses/sticker-responses';

@Injectable({
  providedIn: 'root',
})
export class StickerService {
  stickerUrl = `${environment.apiUrl}/api/stickers`;

  constructor(private http: HttpClient) {}

  getStickersByUserStatus(
    status: string,
    pagingParams?: PagingParams
  ): Observable<getStikcersByUserStatusResponse> {
    const url = `${this.stickerUrl}/by-user-status/${status}`;
    if (pagingParams) {
      const params = new HttpParams().appendAll({
        paged: pagingParams.paged ?? true,
        skip: pagingParams.skip ?? 0,
        limit: pagingParams.limit ?? 10,
      });
      return this.http.get(url, { params });
    } else {
      return this.http.get(url);
    }
  }
}
