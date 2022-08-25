import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Modules
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';

// Components
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { ManageGroupComponent } from './pages/manage-group/manage-group.component';

@NgModule({
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    CommonModule, 
    ReactiveFormsModule,
    AdminRoutingModule
  ],
  declarations: [AdminDashboardComponent, ManageGroupComponent],
})
export class AdminModule {}
