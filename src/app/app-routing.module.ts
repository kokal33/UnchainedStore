import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [{

  path: 'music',
  loadChildren: () => import('./music/music.module').then(m => m.MusicModule)
},
{
  path: 'home',
  component: HomeComponent
},
{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
},
{
  path: 'artists',
  loadChildren: () => import('./artists/artist.module').then(m => m.ArtistModule)
},
{
  path: 'all-artists',
  loadChildren: () => import('./artists-list/artists-main.module').then(m => m.ArtistsMainModule)
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
