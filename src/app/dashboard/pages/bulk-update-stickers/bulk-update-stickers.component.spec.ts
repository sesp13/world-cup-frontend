import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkUpdateStickersComponent } from './bulk-update-stickers.component';

describe('BulkUpdateStickersComponent', () => {
  let component: BulkUpdateStickersComponent;
  let fixture: ComponentFixture<BulkUpdateStickersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkUpdateStickersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkUpdateStickersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
