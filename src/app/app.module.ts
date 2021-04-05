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
import WalletLink from "walletlink";

const providerOptions = {
  walletlink: {
    package: WalletLink,
    options: {
      infuraUrl: 'https://mainnet.infura.io/v3/PROJECT_ID',
      appName: "My Awesome DApp",
      appLogoUrl: "https://example.com/logo.png",
      darkMode: false
    },
  },
};


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MusicModule,
    SharedModule,
    ArtistModule,
  ],
  providers: [
    // {
    //   provide: Web3ModalService,
    //   useFactory: () => {
    //     return new Web3ModalService({
    //       network: "mainnet", // optional
    //       cacheProvider: true, // optional
    //       providerOptions, // required
    //       disableInjectedProvider: true
    //     });
    //   },
    // },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
