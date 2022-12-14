import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Modules
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

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
import { BulkUpdateStickersComponent } from './pages/bulk-update-stickers/bulk-update-stickers.component';
import { StickerSearchBarComponent } from './components/sticker-search-bar/sticker-search-bar.component';

@NgModule({
  declarations: [
    HomeComponent,
    SearchBarComponent,
    StickerGridComponent,
    StickerComponent,
    BulkUpdateStickersComponent,
    StickerSearchBarComponent,
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
    NgMultiSelectDropDownModule.forRoot(),
  ],
})
export class DashboardModule {}
