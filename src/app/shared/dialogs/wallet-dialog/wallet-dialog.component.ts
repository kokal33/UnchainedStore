import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DynamicDialogConfig, DynamicDialogInjector, DynamicDialogRef } from 'primeng/dynamicdialog';
import { WalletDialogData } from 'src/app/models/dialogModels';
import { EnabledProviders, getWalletProviders } from 'src/app/services/providerService';

@Component({
  selector: 'app-wallet-dialog',
  templateUrl: './wallet-dialog.component.html',
  styleUrls: ['./wallet-dialog.component.scss']
})
export class WalletDialogComponent implements OnInit {
  providers!: EnabledProviders;
  constructor(public ref: DynamicDialogRef) {

  }
  ngOnInit(): void {
    this.providers = getWalletProviders();
  }
  onNoClick(): void {
    this.ref.close(null);
  }
  onWalletChoose(wallet: string) {
    this.ref.close(wallet);
  }
}
