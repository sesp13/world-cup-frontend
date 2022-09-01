import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bulk-update-stickers',
  templateUrl: './bulk-update-stickers.component.html',
  styleUrls: ['./bulk-update-stickers.component.scss'],
})
export class BulkUpdateStickersComponent implements OnInit {
  routeSub?: Subscription;
  title: string = ``;
  type?: 'ADD' | 'SUB';

  updateForm = this.fb.group({
    ids: [[], [Validators.required]],
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.defineTypeOfView();
  }

  defineTypeOfView(): void {
    this.route.params.subscribe(({ type }) => {
      switch (type) {
        case 'add': {
          this.type == 'ADD';
          this.title = `Add many stickers`;
          break;
        }
        default: {
          this.router.navigate(['/dashboard']);
          break;
        }
      }
    });
  }
}
