import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CardViewComponent } from './components/card-view-list/card-view.component';
import { CardViewDetailsComponent } from './components/card-view-details/card-view-details.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'nft-listings',
    pathMatch: 'full'
  },
  {
    path: 'nft-listings',
    component: CardViewComponent,
    // children: [
    //   {
    //     // path: 'nft-details',
    //     // component: CardViewComponent,
    //   },
    // ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, SharedModule
  ],
  exports: [RouterModule],
  declarations: [CardViewDetailsComponent, CardViewComponent]
})
export class MusicModule { }
