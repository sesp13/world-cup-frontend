import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { IGroup } from 'src/app/interfaces/group.interface';
import { GetAllGroupsResponse } from 'src/app/interfaces/responses/group-responses';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  groups: IGroup[] = [];

  constructor(private groupService: GroupService) {}

  ngOnInit(): void {
    this.getAllGroups();
  }

  getAllGroups(): void {
    this.groupService
      .getAllGroups()
      .pipe(map((res: GetAllGroupsResponse) => res.groups))
      .subscribe((groups?: IGroup[]) => {
        this.groups = groups != undefined ? groups : [];
      });
  }
}
