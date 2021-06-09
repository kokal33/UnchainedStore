import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { SharedModule } from './shared/shared.module';
import { MarketplaceModule } from './01.Marketplace/marketplace.module';
import { HomeComponent } from './03.Home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ArtistsMainModule } from './02.Artists/artists-main.module'
import { HttpClientModule } from '@angular/common/http';
import { GoogleAnalyticsService } from './07.Services/google-analytics.service';
import { MessageService } from 'primeng/api';
import { BlockUIModule } from 'ng-block-ui';


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
    MarketplaceModule,
    SharedModule,
    ArtistsMainModule,
    BlockUIModule.forRoot(),
    HttpClientModule,
  ],
  providers: [GoogleAnalyticsService, MessageService],

  bootstrap: [AppComponent]
})
export class AppModule { }
