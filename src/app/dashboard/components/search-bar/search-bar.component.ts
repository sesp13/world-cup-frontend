import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { debounceTime, filter, of, Subscription, switchMap } from 'rxjs';
import { ISearchBarOption } from 'src/app/interfaces/search-bar-option.inteface';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit, OnDestroy {
  @Input() label: string = 'Search';
  @Input() options: ISearchBarOption[] = [];

  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();
  @Output() onOptionSelected: EventEmitter<ISearchBarOption> =
    new EventEmitter<ISearchBarOption>();

  myControl = new FormControl('');
  searchSub?: Subscription;

  constructor() {}

  ngOnInit(): void {
    this.setSearchSub();
  }

  ngOnDestroy(): void {
    this.searchSub?.unsubscribe();
  }

  setSearchSub(): void {
    this.searchSub = this.myControl.valueChanges
      .pipe(
        debounceTime(500),
        switchMap((value) => of(value)),
        filter((value) => typeof value == 'string')
      )
      .subscribe({
        next: (value: string | null) => {
          if (value != null && value != '') {
            this.onSearch.emit(value);
          }
        },
      });
  }

  optionSelected(event: MatAutocompleteSelectedEvent): void {
    const value: ISearchBarOption = event.option.value;
    this.myControl.setValue(value.name);
    this.onOptionSelected.emit(value);
  }
}
