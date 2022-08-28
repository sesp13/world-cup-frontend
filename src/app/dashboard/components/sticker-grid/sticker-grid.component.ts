import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISticker } from 'src/app/interfaces/sticker';

@Component({
  selector: 'app-sticker-grid',
  templateUrl: './sticker-grid.component.html',
  styleUrls: ['./sticker-grid.component.scss'],
})
export class StickerGridComponent implements OnInit {
  @Input() stickers: ISticker[] = [];
  @Input() totalStickers: number = 0;
  @Output() onSeeMore: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  seeMore(): void {
    this.onSeeMore.emit(true);
  }
}
