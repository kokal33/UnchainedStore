import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CardViewComponent } from './components/card-view-list/card-view.component';
import { CardViewDetailsComponent } from './components/card-view-details/card-view-details.component';
import { SharedModule } from '../shared/shared.module';
import { NftDetailsComponent } from './components/nft-details/nft-details.component';
import { BidHistoryComponent } from './components/bid-history/bid-history.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'nft-card-view',
    pathMatch: 'full'
  },
  {
    path: 'nft-card-view',
    component: CardViewComponent,
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
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, SharedModule
  ],
  exports: [RouterModule],
  declarations: [CardViewDetailsComponent, CardViewComponent, NftDetailsComponent, BidHistoryComponent]
})
export class MusicModule { }
