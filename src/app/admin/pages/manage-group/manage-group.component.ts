import { IfStmt } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IGroup } from 'src/app/interfaces/group.interface';

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

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {}

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

  createFullTeam(group: IGroup): void {}

  createGroup(group: IGroup): void {}
}
