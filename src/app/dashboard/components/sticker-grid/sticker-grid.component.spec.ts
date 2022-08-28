import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickerGridComponent } from './sticker-grid.component';

describe('StickerGridComponent', () => {
  let component: StickerGridComponent;
  let fixture: ComponentFixture<StickerGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StickerGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StickerGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
