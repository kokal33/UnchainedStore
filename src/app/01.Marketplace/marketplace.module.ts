import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MarketplaceGridComponent } from './components/marketplace-grid/marketplace-grid.component';
import { MarketplaceItemDialogComponent } from './components/marketplace-item-dialog/marketplace-item-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { MarketplaceItemDetailsComponent } from './components/marketplace-item-details/marketplace-item-details.component';
import { MarketplaceItemBidHistoryComponent } from './components/marketplace-item-bid-history/marketplace-item-bid-history.component';
import { MarketplaceItemIpfsDetailsComponent } from './components/marketplace-item-ipfs-details/marketplace-item-ipfs-details.component';

const routes: Routes = [

  {
    path: '',
    component: MarketplaceGridComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, SharedModule,
  ],
  exports: [RouterModule],
  declarations: [MarketplaceItemDialogComponent, MarketplaceGridComponent, MarketplaceItemDetailsComponent, MarketplaceItemBidHistoryComponent, MarketplaceItemIpfsDetailsComponent]
})
export class MarketplaceModule { }
