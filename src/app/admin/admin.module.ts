import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Modules
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';

// Angular Material
import { MatButtonModule } from '@angular/material/button';


// Components
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';

@NgModule({
  imports: [
    MatButtonModule,
    CommonModule, 
    ReactiveFormsModule,
    AdminRoutingModule
  ],
  declarations: [AdminDashboardComponent],
})
export class AdminModule {}
