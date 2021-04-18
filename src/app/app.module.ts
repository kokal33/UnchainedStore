import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { SharedModule } from './shared/shared.module';
import { MusicModule } from './music/music.module';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ArtistModule } from './artists/artist.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ArtistsMainModule } from './artists-list/artists-main.module';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MusicModule,
    SharedModule,
    ArtistModule,
    MatDialogModule,
    ArtistsMainModule,
    MatAutocompleteModule,
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
