import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Modules
import { DashboardRoutingModule } from './dashboard-routing.module';

// Material
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

// Components
import { HomeComponent } from './pages/home/home.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StickerGridComponent } from './components/sticker-grid/sticker-grid.component';
import { StickerComponent } from './pages/sticker/sticker.component';

@NgModule({
  declarations: [
    HomeComponent,
    SearchBarComponent,
    StickerGridComponent,
    StickerComponent,
  ],
  imports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
  ],
})
export class DashboardModule {}
