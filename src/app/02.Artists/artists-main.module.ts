import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistGridComponent } from './components/artist-grid/artist-grid.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { NftCardComponent } from '../shared/components/nft-card/nft-card.component';
import { MarketplaceItemDetailsComponent } from '../01.Marketplace/components/marketplace-item-details/marketplace-item-details.component';
import { MarketplaceItemBidHistoryComponent } from '../01.Marketplace/components/marketplace-item-bid-history/marketplace-item-bid-history.component';

const routes: Routes = [

  {
    path: '',
    component: ArtistGridComponent,

  },
  {
    path: 'user-details/:id',
    component: UserDetailsComponent,
    children: [{
      path: '',
      redirectTo: 'collections',
      pathMatch: 'full'
    },
    {
      path: 'collections',
      component: NftCardComponent,
      children: [
        {
          path: 'nft-details',
          component: MarketplaceItemDetailsComponent,
        },
        {
          path: 'bid-history',
          component: MarketplaceItemBidHistoryComponent,
        },
      ]
    },
    {
      path: 'created',
      component: NftCardComponent,
      children: [
        {
          path: 'nft-details',
          component: MarketplaceItemDetailsComponent,
        },
        {
          path: 'bid-history',
          component: MarketplaceItemBidHistoryComponent,
        },
      ]
    },
    ]
  }
];

@NgModule({
  declarations: [ArtistGridComponent, UserDetailsComponent],
  imports: [RouterModule.forChild(routes), CommonModule, SharedModule
  ],
  exports: [RouterModule],
})
export class ArtistsMainModule { }
