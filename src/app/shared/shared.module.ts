import { NgModule } from '@angular/core';
import { MaterialModule } from './angular-material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResponsiveToolbarComponent } from './components/responsive-toolbar/responsive-toolbar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WalletDialogComponent } from './dialogs/wallet-dialog/wallet-dialog.component';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { SubscribeDialogComponent } from './dialogs/subscribe-dialog/subscribe-dialog.component';
import { EditUserDialogComponent } from './dialogs/edit-user-dialog/edit-user-dialog.component';
import { NftCardComponent } from './components/nft-card/nft-card.component';
import { ResponsiveFooterComponent } from './components/responsive-footer/responsive-footer.component';
import { CreateNftDialogComponent } from './dialogs/create-nft-dialog/create-nft-dialog.component';



@NgModule({
  declarations: [ResponsiveToolbarComponent, WalletDialogComponent, SubscribeDialogComponent, EditUserDialogComponent, NftCardComponent, ResponsiveFooterComponent, CreateNftDialogComponent],
  imports: [FlexLayoutModule, MaterialModule, ReactiveFormsModule, FormsModule, CommonModule, RouterModule, NgxAudioPlayerModule],
  exports: [FlexLayoutModule, MaterialModule, ReactiveFormsModule, FormsModule, ResponsiveToolbarComponent,ResponsiveFooterComponent]
})
export class SharedModule { }
