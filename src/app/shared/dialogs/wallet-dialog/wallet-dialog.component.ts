import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WalletDialogData } from 'src/app/models/dialogModels';
import { getWalletProviders } from 'src/app/services/providerService';

@Component({
  selector: 'app-wallet-dialog',
  templateUrl: './wallet-dialog.component.html',
  styleUrls: ['./wallet-dialog.component.css']
})
export class WalletDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<WalletDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WalletDialogData)
  { }

  ngOnInit(): void {
     this.data.providers = getWalletProviders();
  }
  onNoClick(): void {
    this.dialogRef.close(null);
  }
  onWalletChoose(wallet:string){
     this.dialogRef.close(wallet);
  }
}
