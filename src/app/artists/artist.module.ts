import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ArtistsComponent } from './artists.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [

  {
    path: '',
    component: ArtistsComponent,
    // children: [
    //   {
    //     // path: 'nft-details',
    //     // component: CardViewComponent,
    //   },
    // ]
  }
];


@NgModule({
  declarations: [ArtistsComponent],
  imports: [RouterModule.forChild(routes), CommonModule, SharedModule
  ],
  exports: [RouterModule],
})
export class ArtistModule { }
