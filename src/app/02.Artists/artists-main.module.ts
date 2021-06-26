import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistGridComponent } from './components/artist-grid/artist-grid.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { UserDetailsComponent } from './components/user-details/user-details.component';

const routes: Routes = [

  {
    path: '',
    component: ArtistGridComponent,

  },
  {
    path: 'user-details/:id',
    component: UserDetailsComponent,
  }
];

@NgModule({
  declarations: [ArtistGridComponent, UserDetailsComponent],
  imports: [RouterModule.forChild(routes), CommonModule, SharedModule
  ],
  exports: [RouterModule],
})
export class ArtistsMainModule { }
