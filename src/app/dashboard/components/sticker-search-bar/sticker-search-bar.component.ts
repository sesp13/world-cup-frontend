import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ISearchBarOption } from 'src/app/interfaces/search-bar-option.inteface';
import { ISticker } from 'src/app/interfaces/sticker';
import { StickerService } from 'src/app/services/sticker.service';

@Component({
  selector: 'app-sticker-search-bar',
  templateUrl: './sticker-search-bar.component.html',
  styleUrls: ['./sticker-search-bar.component.scss'],
})
export class StickerSearchBarComponent {
  @Input() type: 'ALL' | 'PENDING' | 'PROVIDED' | 'REPEATED' = 'ALL';
  options: ISearchBarOption[] = [];

  constructor(private router: Router, private stickerService: StickerService) {}

  search(term: string) {
    const model: ISticker = this.generateSearchFilter();
    this.stickerService.searchStickers(term, model).subscribe({
      next: (response) => {
        if (response.stickers) {
          const newOptions = this.parseSearchOptions(response.stickers);
          this.options = newOptions;
        }
      },
    });
  }

  generateSearchFilter(): ISticker {
    const model: ISticker = {};
    switch (this.type) {
      case 'PENDING':
      case 'PROVIDED':
      case 'REPEATED':
        model.status = this.type;
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
