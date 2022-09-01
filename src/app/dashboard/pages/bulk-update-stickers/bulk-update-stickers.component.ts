import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { map, Subscription } from 'rxjs';
import { GetStickersByUserResponse } from 'src/app/interfaces/responses/sticker-responses';
import { ISearchBarOption } from 'src/app/interfaces/search-bar-option.inteface';
import { StickerService } from 'src/app/services/sticker.service';

@Component({
  selector: 'app-bulk-update-stickers',
  templateUrl: './bulk-update-stickers.component.html',
  styleUrls: ['./bulk-update-stickers.component.scss'],
})
export class BulkUpdateStickersComponent implements OnInit {
  routeSub?: Subscription;
  title: string = ``;
  formLabel: string = ``;
  sendButtonLabel: string = ``;
  type?: 'ADD' | 'SUB';

  updateForm: FormGroup = this.fb.group({
    ids: [[], [Validators.required]],
  });

  stickerOptions: ISearchBarOption[] = [];

  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'code',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true,
    enableCheckAll: false,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private stickerService: StickerService
  ) {}

  ngOnInit(): void {
    this.defineTypeOfView();
    this.getOptions();
  }

  defineTypeOfView(): void {
    this.route.params.subscribe(({ type }) => {
      switch (type) {
        case 'add': {
          this.type = 'ADD';
          this.title = `Add many stickers`;
          this.formLabel = `Select the stickers to add`;
          this.sendButtonLabel = `Add`;
          break;
        }
        default: {
          this.router.navigate(['/dashboard']);
          break;
        }
      }
    });
  }

  getOptions(): void {
    this.stickerService
      .getUserStickers()
      .pipe(
        map((res: GetStickersByUserResponse) => {
          return (
            res?.stickers?.map((sticker) => ({
              code: sticker._id!,
              name: `${sticker.metaSticker?.code} ${sticker.metaSticker?.name}`,
            })) ?? []
          );
        })
      )
      .subscribe((options: ISearchBarOption[]) => {
        this.stickerOptions = options;
      });
  }

  submitForm(): void {
    const { ids } = this.updateForm.value;
    const parsedIds = ids?.map((item: ISearchBarOption) => item.code);
    if(this.type ==  "ADD"){
      console.log(parsedIds);
    }
  }
}
