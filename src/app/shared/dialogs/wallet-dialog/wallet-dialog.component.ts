import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { getWalletProviders } from 'src/app/04.Helpers/providerHelper';
import { EnabledProviders } from 'src/app/07.Services/provider.service';

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

