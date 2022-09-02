import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickerSearchBarComponent } from './sticker-search-bar.component';

describe('StickerSearchBarComponent', () => {
  let component: StickerSearchBarComponent;
  let fixture: ComponentFixture<StickerSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StickerSearchBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StickerSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
