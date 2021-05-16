import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistGridComponent } from './components/artist-grid/artist-grid.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { NftCardComponent } from '../shared/components/nft-card/nft-card.component';
import { NftDetailsComponent } from '../music/components/nft-details/nft-details.component';
import { BidHistoryComponent } from '../music/components/bid-history/bid-history.component';

const routes: Routes = [

  {
    path: '',
    component: ArtistGridComponent,

  },
  {
    path: 'user-details',
    component: UserDetailsComponent,
    children: [{
      path: 'nft-listings',
      component: NftCardComponent,
      children: [
        {
          path: '',
          redirectTo: 'nft-tab-details',
          pathMatch: 'full'
        },
        {
          path: 'nft-tab-details',
          component: NftDetailsComponent,
        },
        {
          path: 'bid-history',
          component: BidHistoryComponent,
        },
      ]
    },
    {
      path: '',
      redirectTo: 'nft-listings',
      pathMatch: 'full'
    }
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
