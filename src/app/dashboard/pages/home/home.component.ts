import { Component, OnInit } from '@angular/core';
import { getStikcersByUserStatusResponse } from 'src/app/interfaces/responses/sticker-responses';
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

  constructor(private authService: AuthService, private stickerService: StickerService) {}

  ngOnInit(): void {
    this.getPendingStickers();
  }

  getPendingStickers(): void {
    this.stickerService.getStickersByUserStatus('PENDING').subscribe({
      next: (response: getStikcersByUserStatusResponse) => {
        this.pendingStickers = response.stickers ?? [];
      },  
      error: (error) => {
        console.log(error);
      }
    })
  }

  logout(): void {
    this.authService.logout();
  }


}
