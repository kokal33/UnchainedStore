import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CardViewComponent } from './card-view.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'nft-listings',
    pathMatch:'full'
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
imports: [RouterModule.forChild(routes), CommonModule],
exports: [RouterModule]
})
export class CardViewModule {}
