import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PagingParams } from '../interfaces/paging-params';
import { MessageResponse } from '../interfaces/responses/standard-responses';
import {
  GetAllowedStickerStatusesResponse,
  GetStickerByIdResponse,
  GetStickersByUserResponse,
  GetStickersByUserStatusResponse,
  SearchStickersResponse,
  UpdateStickerResponse,
} from '../interfaces/responses/sticker-responses';
import { ISticker } from '../interfaces/sticker';

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

  // The user is passed through the token
  getUserStickers(): Observable<GetStickersByUserResponse> {
    const url = `${this.stickerUrl}/by-user/`;
    return this.http.get(url);
  }

  getStickerById(id: string): Observable<GetStickerByIdResponse> {
    const url = `${this.stickerUrl}/by-id/${id}`;
    return this.http.get(url);
  }

  getAllowedStickerStatuses(): Observable<GetAllowedStickerStatusesResponse> {
    const url = `${this.stickerUrl}/allowed-statuses`;
    return this.http.get(url);
  }

  updateSticker(sticker: ISticker): Observable<UpdateStickerResponse> {
    return this.http.put(this.stickerUrl, sticker);
  }

  searchStickers(
    term: string,
    model: ISticker
  ): Observable<SearchStickersResponse> {
    const url = `${this.stickerUrl}/search/${term}`;
    return this.http.post(url, model);
  }

  bulkUpdateStickersAmount(
    stickerIds: string[],
    type: string
  ): Observable<MessageResponse> {
    const url = `${this.stickerUrl}/bulk-update-amount`;
    return this.http.put(url, { stickerIds, type });
  }
}
