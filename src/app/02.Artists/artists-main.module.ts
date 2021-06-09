import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistGridComponent } from './components/artist-grid/artist-grid.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { NftCardComponent } from '../shared/components/nft-card/nft-card.component';
import { MarketplaceItemDetailsComponent } from '../01.Marketplace/components/marketplace-item-details/marketplace-item-details.component';
import { MarketplaceItemBidHistoryComponent } from '../01.Marketplace/components/marketplace-item-bid-history/marketplace-item-bid-history.component';
import { CollectionsComponent } from './components/collections/collections.component';
import { CreatedComponent } from './components/created/created.component';

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
      component: CollectionsComponent,
      children: [
        {
          path: 'nft-details/:id',
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
      component: CreatedComponent,
      children: [
        {
          path: 'nft-details/:id',
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
  declarations: [ArtistGridComponent, UserDetailsComponent, CollectionsComponent, CreatedComponent],
  imports: [RouterModule.forChild(routes), CommonModule, SharedModule
  ],
  exports: [RouterModule],
})
export class ArtistsMainModule { }
