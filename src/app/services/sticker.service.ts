import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PagingParams } from '../interfaces/paging-params';
import {
  GetAllowedStickerStatusesResponse,
  GetStickerByIdResponse,
  GetStickersByUserStatusResponse,
} from '../interfaces/responses/sticker-responses';

@Injectable({
  providedIn: 'root',
})
export class StickerService {
  stickerUrl = `${environment.apiUrl}/api/stickers`;

  constructor(private http: HttpClient) {}

  getStickersByUserStatus(
    status: string,
    pagingParams?: PagingParams
  ): Observable<GetStickersByUserStatusResponse> {
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

  getStickerById(id: string): Observable<GetStickerByIdResponse> {
    const url = `${this.stickerUrl}/by-id/${id}`;
    return this.http.get(url);
  }
  
  getAllowedStickerStatuses(): Observable<GetAllowedStickerStatusesResponse>{
    const url = `${this.stickerUrl}/allowed-statuses`;
    return this.http.get(url);
  }

}
