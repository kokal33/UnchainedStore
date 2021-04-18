import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistGridComponent } from './components/artist-grid/artist-grid.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ArtistDetailsComponent } from './components/artist-details/artist-details.component';

const routes: Routes = [

  {
    path: '',
    component: ArtistGridComponent,

  },
  {
    path: 'artist-details',
    component: ArtistDetailsComponent,

  }
];

@NgModule({
  declarations: [ArtistGridComponent, ArtistDetailsComponent],
  imports: [RouterModule.forChild(routes), CommonModule, SharedModule
  ],
  exports: [RouterModule],
})
export class ArtistsMainModule { }
