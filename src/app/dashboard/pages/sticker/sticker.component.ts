import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  GetAllowedStickerStatusesResponse,
  GetStickerByIdResponse,
} from 'src/app/interfaces/responses/sticker-responses';
import { ISticker } from 'src/app/interfaces/sticker';
import { StickerService } from 'src/app/services/sticker.service';

@Component({
  selector: 'app-sticker',
  templateUrl: './sticker.component.html',
  styleUrls: ['./sticker.component.scss'],
})
export class StickerComponent implements OnInit, OnDestroy {
  sticker?: ISticker;
  allowedStatuses: string[] = [];

  routeSub?: Subscription;

  stickerForm: FormGroup = this.fb.group({
    amount: [this.sticker?.amount, [Validators.required]],
    status: [this.sticker?.status, [Validators.required]],
  });

  get amountControl() {
    return this.stickerForm.get('amount');
  }

  get statusControl() {
    return this.stickerForm.get('status');
  }

  constructor(
    private stickerService: StickerService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(({ id }) => {
      this.getSticker(id);
    });
    this.getAllowedStatuses();
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  getSticker(id: string): void {
    this.stickerService.getStickerById(id).subscribe({
      next: (response: GetStickerByIdResponse) => {
        this.sticker = response.sticker;
        this.stickerForm.reset({
          amount: this.sticker?.amount,
          status: this.sticker?.status,
        });
      },
      error: () => {
        this.router.navigate(['/dashboard']);
      },
    });
  }

  getAllowedStatuses(): void {
    this.stickerService
      .getAllowedStickerStatuses()
      .subscribe((response: GetAllowedStickerStatusesResponse) => {
        this.allowedStatuses = response.statuses ?? [];
      });
  }

  changeAmountField(): void {
    const amount = this.amountControl?.value;
    if (amount == 0) {
      this.statusControl?.setValue('PENDING');
    } else if (amount == 1) {
      this.statusControl?.setValue('PROVIDED');
    } else if (amount > 1) {
      this.statusControl?.setValue('REPEATED');
    }
  }
}
