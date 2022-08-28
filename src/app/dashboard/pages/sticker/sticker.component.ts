import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetStickerByIdResponse } from 'src/app/interfaces/responses/sticker-responses';
import { ISticker } from 'src/app/interfaces/sticker';
import { StickerService } from 'src/app/services/sticker.service';

@Component({
  selector: 'app-sticker',
  templateUrl: './sticker.component.html',
  styleUrls: ['./sticker.component.scss'],
})
export class StickerComponent implements OnInit, OnDestroy {
  sticker?: ISticker;

  routeSub?: Subscription;

  constructor(
    private stickerService: StickerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(({ id }) => {
      this.getSticker(id);
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  getSticker(id: string): void {
    this.stickerService.getStickerById(id).subscribe({
      next: (response: GetStickerByIdResponse) => {
        this.sticker = response.sticker;
      },
      error: () => {
        this.router.navigate(['/dashboard']);
      },
    });
  }
}
