import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { catchError, Subscription } from 'rxjs';
import { IGroup } from 'src/app/interfaces/group.interface';
import { CreateTeamResponse } from 'src/app/interfaces/responses/admin-responses';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-manage-group',
  templateUrl: './manage-group.component.html',
  styleUrls: ['./manage-group.component.scss'],
})
export class ManageGroupComponent implements OnInit, OnDestroy {
  isNew: boolean = true;
  title: string = 'Create Group';
  groupId?: string;

  routeSub?: Subscription;

  groupForm: FormGroup = this.fb.group({
    code: ['', [Validators.required]],
    name: [''],
    isFullTeam: [false],
  });
  createFullTeamInfo =
    'Creates the group and 20 associated meta stickers for this group';

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.isNew = false;
        this.groupId = params['id'];
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  submitForm(): void {
    const { code, name, isFullTeam } = this.groupForm.value;
    if (this.isNew) {
      if (isFullTeam) {
        this.createFullTeam({ code, name });
      } else {
        this.createGroup({ code, name });
      }
    }
  }

  createFullTeam(group: IGroup): void {
    this.adminService.createTeam(group).subscribe({
      next: (response: CreateTeamResponse) => {
        alert('Success! team created');
        const id: string = response.group?._id ?? '';
        this.router.navigate(['/admin/manage-group', id]);
      },
      error: (error: HttpErrorResponse) => {
        const msg = error?.error?.msg ?? 'Error during full team creation';
        alert(msg);
      },
    });
  }

  createGroup(group: IGroup): void {}

  private resetGroupForm() {
    this.groupForm.reset();
    Object.keys(this.groupForm.controls).forEach((key: string) => {
      this.groupForm.get(key)?.setErrors(null);
    });
  }
}
