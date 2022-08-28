import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Modules
import { DashboardRoutingModule } from './dashboard-routing.module';

// Material
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// Components
import { HomeComponent } from './pages/home/home.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StickerGridComponent } from './components/sticker-grid/sticker-grid.component';

@NgModule({
  declarations: [HomeComponent, SearchBarComponent, StickerGridComponent],
  imports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
  ],
})
export class DashboardModule {}
