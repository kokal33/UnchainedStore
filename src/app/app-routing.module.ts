import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './03.Home/home.component';

const routes: Routes = [{

  path: 'marketplace',
  loadChildren: () => import('./01.Marketplace/marketplace.module').then(m => m.MarketplaceModule)
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
  loadChildren: () => import('./02.Artists/artists-main.module').then(m => m.ArtistsMainModule)
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
