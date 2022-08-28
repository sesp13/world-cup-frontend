import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { getStikcersByUserStatusResponse } from '../interfaces/responses/sticker-responses';
import { ISticker } from '../interfaces/sticker';

@Injectable({
  providedIn: 'root',
})
export class StickerService {
  stickerUrl = `${environment.apiUrl}/api/stickers`;

  constructor(private http: HttpClient) {}

  getStickersByUserStatus(
    status: string
  ): Observable<getStikcersByUserStatusResponse> {
    const url = `${this.stickerUrl}/by-user-status/${status}`;
    return this.http.get(url);
  }
}
