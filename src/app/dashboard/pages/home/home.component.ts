import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PagingParams } from 'src/app/interfaces/paging-params';
import { GetStickersByUserStatusResponse } from 'src/app/interfaces/responses/sticker-responses';
import { ISearchBarOption } from 'src/app/interfaces/search-bar-option.inteface';
import { ISticker } from 'src/app/interfaces/sticker';
import { IUser } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { StickerService } from 'src/app/services/sticker.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user: IUser | null = this.authService.user;

  globalSearchOptions: ISearchBarOption[] = [];
  searchPendingOptions: ISearchBarOption[] = [];
  searchProvidedOptions: ISearchBarOption[] = [];
  searchRepeatedOptions: ISearchBarOption[] = [];

  pendingStickers: ISticker[] = [];
  totalPendingStickers: number = 0;
  skipPendingStickers: number = 0;
  limitPendingStickers: number = 10;

  providedStickers: ISticker[] = [];
  totalProvidedStickers: number = 0;
  skipProvidedStickers: number = 0;
  limitProvidedStickers: number = 4;

  repeatedStickers: ISticker[] = [];
  totalRepeatedStickers: number = 0;
  skipRepeatedStickers: number = 0;
  limitRepeatedStickers: number = 6;

  constructor(
    private authService: AuthService,
    private stickerService: StickerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getStickers('PENDING');
    this.getStickers('PROVIDED');
    this.getStickers('REPEATED');
  }

  getStickers(type: string): void {
    const params: PagingParams | undefined = this.parsePagingParams(type);
    if (!params) return;

    this.stickerService.getStickersByUserStatus(type, params).subscribe({
      next: (response: GetStickersByUserStatusResponse) => {
        const newStickers = response.stickers ?? [];
        const totalStickers = response.totalStickers ?? 0;
        switch (type) {
          case 'PENDING':
            this.pendingStickers = [...this.pendingStickers, ...newStickers];
            this.totalPendingStickers = totalStickers;
            break;
          case 'PROVIDED':
            this.providedStickers = [...this.providedStickers, ...newStickers];
            this.totalProvidedStickers = totalStickers;
            break;
          case 'REPEATED':
            this.repeatedStickers = [...this.repeatedStickers, ...newStickers];
            this.totalRepeatedStickers = totalStickers;
            break;
          default:
            return;
        }
      },
      error: (error) => {
        console.log(error);
        alert('Error on pending stickers');
      },
    });
  }

  parsePagingParams(type: string): PagingParams | undefined {
    let skip: number, limit: number;
    switch (type) {
      case 'PENDING':
        skip = this.skipPendingStickers;
        limit = this.limitPendingStickers;
        break;
      case 'PROVIDED':
        skip = this.skipProvidedStickers;
        limit = this.limitPendingStickers;
        break;
      case 'REPEATED':
        skip = this.skipRepeatedStickers;
        limit = this.limitRepeatedStickers;
        break;
      default:
        return undefined;
    }
    return { paged: true, skip, limit };
  }

  seeMoreStickers(type: string): void {
    switch (type) {
      case 'PENDING': {
        this.skipPendingStickers += this.limitPendingStickers;
        this.getStickers('PENDING');
        break;
      }
      case 'PROVIDED': {
        this.skipProvidedStickers += this.limitProvidedStickers;
        this.getStickers('PROVIDED');
        break;
      }
      case 'REPEATED': {
        this.skipProvidedStickers += this.limitProvidedStickers;
        this.getStickers('REPEATED');
        break;
      }
    }
  }

  logout(): void {
    this.authService.logout();
  }

  search(term: string, type: string) {
    const model: ISticker = this.generateSearchFilter(type);
    this.stickerService.searchStickers(term, model).subscribe({
      next: (response) => {
        if (response.stickers) {
          const newOptions = this.parseSearchOptions(response.stickers);
          switch (type) {
            case 'ALL':
              this.globalSearchOptions = newOptions;
              break;
            case 'PENDING':
              this.searchPendingOptions = newOptions;
              break;
            case 'PROVIDED':
              this.searchProvidedOptions = newOptions;
              break;
            case 'REPEATED':
              this.searchRepeatedOptions = newOptions;
              break;
          }
        }
      },
    });
  }

  generateSearchFilter(type: string): ISticker {
    const model: ISticker = {};
    switch (type) {
      case 'PENDING':
      case 'PROVIDED':
      case 'REPEATED':
        model.status = type;
        break;
    }
    return model;
  }

  parseSearchOptions(stickers: ISticker[]) {
    return stickers.map((sticker: ISticker) => {
      return {
        code: sticker._id ?? '',
        name: `${sticker.metaSticker?.code} ${sticker.metaSticker?.name}`,
      };
    });
  }

  searchOptionSelected(value: ISearchBarOption) {
    this.router.navigate(['/dashboard/sticker', value.code]);
  }
}
