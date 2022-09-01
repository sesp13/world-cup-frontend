import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BulkUpdateStickersComponent } from './pages/bulk-update-stickers/bulk-update-stickers.component';
import { HomeComponent } from './pages/home/home.component';
import { StickerComponent } from './pages/sticker/sticker.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'sticker/:id',
    component: StickerComponent
  },
  {
    path: 'bulk-update-stickers/:type',
    component: BulkUpdateStickersComponent
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
