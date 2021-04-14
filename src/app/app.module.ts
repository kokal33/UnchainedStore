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
import {MatDialogModule} from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgxAudioPlayerModule } from 'ngx-audio-player';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MusicModule,
    SharedModule,
    ArtistModule,
    MatDialogModule,
    MatAutocompleteModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
