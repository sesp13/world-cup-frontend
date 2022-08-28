import { Component, OnInit } from '@angular/core';
import { GetStickersByUserStatusResponse } from 'src/app/interfaces/responses/sticker-responses';
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

  pendingStickers: ISticker[] = [];
  totalPendingStickers: number = 0;
  skipPendingStickers: number = 0;
  limitPendingStickers: number = 10;

  constructor(
    private authService: AuthService,
    private stickerService: StickerService
  ) {}

  ngOnInit(): void {
    this.getPendingStickers();
  }

  getPendingStickers(): void {
    this.stickerService
      .getStickersByUserStatus('PENDING', {
        paged: true,
        skip: this.skipPendingStickers,
        limit: this.limitPendingStickers,
      })
      .subscribe({
        next: (response: GetStickersByUserStatusResponse) => {
          this.pendingStickers =
            response.stickers !== undefined
              ? [...this.pendingStickers, ...response.stickers]
              : [];
          this.totalPendingStickers = response.totalStickers ?? 0;
        },
        error: (error) => {
          console.log(error);
          alert('Error on pending stickers');
        },
      });
  }

  seeMoreStickers(type: string): void {
    switch (type) {
      case 'pending': {
        // Update pagination
        this.skipPendingStickers += this.limitPendingStickers;
        this.getPendingStickers();
        break;
      }
    }
  }



  logout(): void {
    this.authService.logout();
  }
}
